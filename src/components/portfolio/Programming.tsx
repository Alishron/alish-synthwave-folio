import { useEffect, useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type LeetCodeStats = {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  reputation: number;
  submissionCount: number;
  profileUrl?: string;
};

const LEETCODE_USERNAME = "sahdevalish0";
const API_URL = `https://leetcode-stats-api.vercel.app/${LEETCODE_USERNAME}`;

function statLabel(value: number | string, label: string) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl p-5 text-center">
      <div className="text-3xl font-semibold text-primary">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Programming() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`LeetCode API request failed (${response.status})`);
        }

        const data = await response.json();
        const totalSubmissionEntry = Array.isArray(data.totalSubmissionNum)
          ? data.totalSubmissionNum.find((entry: any) => entry.difficulty === "All")
          : Array.isArray(data.totalSubmissions)
          ? data.totalSubmissions.find((entry: any) => entry.difficulty === "All")
          : undefined;

        const totalSubmissions = Number(totalSubmissionEntry?.submissions ?? 0);
        const totalSolved = Number(data.totalSolved ?? 0);

        setStats({
          username: LEETCODE_USERNAME,
          totalSolved,
          easySolved: Number(data.easySolved ?? 0),
          mediumSolved: Number(data.mediumSolved ?? 0),
          hardSolved: Number(data.hardSolved ?? 0),
          ranking: Number(data.ranking ?? 0),
          reputation: Number(data.reputation ?? 0),
          submissionCount: totalSubmissions,
          profileUrl: `https://leetcode.com/${LEETCODE_USERNAME}`,
        });
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load LeetCode profile."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <section id="programming" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Programming"
          title="Coding Stats"
          subtitle="A real-time view of my algorithm practice and problem-solving progress."
        />

        <div className="glass rounded-3xl p-6 shadow-[0_0_60px_-20px_rgba(56,189,248,0.5)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-7">
            <div>
              <div className="text-sm font-mono uppercase tracking-[0.3em] text-primary/80">
                LeetCode snapshot
              </div>
              <h3 className="mt-2 text-3xl font-semibold">{LEETCODE_USERNAME}</h3>
            </div>

            <a
              href={`https://leetcode.com/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              View profile
            </a>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            {loading ? (
              <div className="glass col-span-full rounded-3xl p-6 text-center text-sm text-muted-foreground">
                Loading LeetCode stats...
              </div>
            ) : error ? (
              <div className="glass col-span-full rounded-3xl p-6 text-center text-sm text-destructive">
                {error}
              </div>
            ) : stats ? (
              <>
                <div className="space-y-4">
                  <div className="glass rounded-3xl p-5 text-center">
                    <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-semibold">Solved</div>
                    <div className="mt-4 text-5xl font-bold text-primary">{stats.totalSolved}</div>
                  </div>

                  <div className="glass rounded-3xl p-5 text-center">
                    <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-semibold">Rank</div>
                    <div className="mt-4 text-5xl font-bold text-primary">{stats.ranking > 0 ? `#${stats.ranking}` : '—'}</div>
                  </div>

                  <div className="glass rounded-3xl p-5 text-center">
                    <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-semibold">Submissions</div>
                    <div className="mt-4 text-5xl font-bold text-primary">{stats.submissionCount}</div>
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 lg:row-span-3">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-5">
                    <Code2 className="h-4 w-4" />
                    Problem breakdown
                  </div>
                  <div className="space-y-5">
                    {[
                      { label: 'Easy', value: stats.easySolved, color: 'from-green-500' },
                      { label: 'Medium', value: stats.mediumSolved, color: 'from-yellow-500' },
                      { label: 'Hard', value: stats.hardSolved, color: 'from-red-500' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground font-semibold">{item.value}</span>
                        </div>
                        <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.color} to-cyan-400`}
                            style={{ width: `${Math.min(100, (item.value / Math.max(1, stats.totalSolved)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
