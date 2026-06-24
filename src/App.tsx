import { useEffect, useState } from 'react';
import { sdk } from './sdk';
import styles from './App.module.css';

// Fields to request for each client. `as const` keeps the literal `1`s so the
// SDK can infer the exact shape of the returned rows.
const CLIENT_GRAPH = {
    id: 1,
    fullName: 1,
    city: 1,
    avatarColor: 1,
} as const;

type Client = Awaited<
    ReturnType<typeof sdk.getClients<typeof CLIENT_GRAPH>>
>['data'][number];

export function App() {
    const [clients, setClients] = useState<Client[]>([]);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
        'loading',
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        sdk.getClients({
            ...CLIENT_GRAPH,
            $limit: 100,
        })
            .then((result) => {
                if (cancelled) return;
                setClients(result.data);
                setStatus('ready');
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : String(err));
                setStatus('error');
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className={styles.app}>
            <h1 className={styles.title}>Kilanka Applet-Starter-Template</h1>

            {status === 'loading' && (
                <p className={styles.muted}>Lade Klienten…</p>
            )}
            {status === 'error' && (
                <p className={styles.error}>Fehler: {error}</p>
            )}
            {status === 'ready' &&
                (clients.length === 0 ? (
                    <p className={styles.muted}>Keine Klienten gefunden.</p>
                ) : (
                    <ul className={styles.list}>
                        {clients.map((client) => (
                            <li key={client.id} className={styles.item}>
                                <span
                                    className={styles.avatar}
                                    style={{
                                        backgroundColor:
                                            client.avatarColor ?? '#888',
                                    }}
                                    aria-hidden
                                >
                                    {client.fullName.charAt(0).toUpperCase()}
                                </span>
                                <span className={styles.name}>
                                    {client.fullName}
                                </span>
                                {client.city && (
                                    <span className={styles.city}>
                                        {client.city}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
        </main>
    );
}
