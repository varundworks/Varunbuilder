import { notFound } from "next/navigation";
import { getCardBySubdomain, getTodaysFestival, getUpcomingFestivals } from "@/lib/db";
import GreetingCard from "@/components/GreetingCard";

export const dynamic = "force-dynamic";

export default async function GreetingsPage(props: { params: Promise<{ domain: string }> }) {
    const params = await props.params;
    const domain = params.domain;

    const card = await getCardBySubdomain(domain);
    if (!card || !card.enableGreetings) {
        notFound();
    }

    const todaysFestival = await getTodaysFestival();
    const upcomingFestivals = await getUpcomingFestivals();

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "2rem" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                        Festival Greetings
                    </h1>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                        Share personalized festival wishes with your contacts
                    </p>
                </div>

                {/* Today's Festival */}
                {todaysFestival && (
                    <div style={{ marginBottom: "3rem" }}>
                        <div style={{
                            padding: "1rem",
                            backgroundColor: "#fef3c7",
                            borderRadius: "12px",
                            marginBottom: "1rem",
                            textAlign: "center",
                            fontWeight: "600"
                        }}>
                            🎉 Today is {todaysFestival.name}! Share your wishes now
                        </div>
                        <GreetingCard card={card} festival={todaysFestival} />
                    </div>
                )}

                {/* Upcoming Festivals */}
                <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                        Upcoming Festivals
                    </h2>
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                        {upcomingFestivals.map(festival => (
                            <GreetingCard key={festival.id} card={card} festival={festival} />
                        ))}
                    </div>
                </div>

                {upcomingFestivals.length === 0 && !todaysFestival && (
                    <div style={{
                        textAlign: "center",
                        padding: "4rem 2rem",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        color: "#9ca3af"
                    }}>
                        <p style={{ fontSize: "1.1rem" }}>No upcoming festivals at the moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}
