export default function DomainPage({
    params,
}: {
    params: { domain: string };
}) {
    return (
        <div style={{ padding: 40 }}>
            <h1>Subdomain works ✅</h1>
            <p>Domain: {params.domain}</p>
        </div>
    );
}
