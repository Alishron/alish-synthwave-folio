import { useEffect, useState } from "react";
import { ExternalLink, Code2, Github } from "lucide-react";
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

type GitHubStats = {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  profileUrl?: string;
};

const LEETCODE_USERNAME = "sahdevalish0";
const GITHUB_USERNAME = "Alishron";
const LEETCODE_API_URL = `https://leetcode-stats-api.vercel.app/${LEETCODE_USERNAME}`;
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

function statLabel(value: number | string, label: string) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl p-5 text-center">
      <div className="text-3xl font-semibold text-primary">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Programming() {
  const [selectedTab, setSelectedTab] = useState<"leetcode" | "github">("leetcode");
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllStats() {
      try {
        // Fetch LeetCode Stats
        const leetcodeResponse = await fetch(LEETCODE_API_URL);
        if (!leetcodeResponse.ok) {
          throw new Error(`LeetCode API request failed (${leetcodeResponse.status})`);
        }

        const leetcodeData = await leetcodeResponse.json();
        const totalSubmissionEntry = Array.isArray(leetcodeData.totalSubmissionNum)
          ? leetcodeData.totalSubmissionNum.find((entry: any) => entry.difficulty === "All")
          : Array.isArray(leetcodeData.totalSubmissions)
          ? leetcodeData.totalSubmissions.find((entry: any) => entry.difficulty === "All")
          : undefined;

        const totalSubmissions = Number(totalSubmissionEntry?.submissions ?? 0);
        const totalSolved = Number(leetcodeData.totalSolved ?? 0);

        setLeetcodeStats({
          username: LEETCODE_USERNAME,
          totalSolved,
          easySolved: Number(leetcodeData.easySolved ?? 0),
          mediumSolved: Number(leetcodeData.mediumSolved ?? 0),
          hardSolved: Number(leetcodeData.hardSolved ?? 0),
          ranking: Number(leetcodeData.ranking ?? 0),
          reputation: Number(leetcodeData.reputation ?? 0),
          submissionCount: totalSubmissions,
          profileUrl: `https://leetcode.com/${LEETCODE_USERNAME}`,
        });

        // Fetch GitHub Stats
        const githubResponse = await fetch(GITHUB_API_URL);
        if (!githubResponse.ok) {
          throw new Error(`GitHub API request failed (${githubResponse.status})`);
        }

        const githubData = await githubResponse.json();
        setGithubStats({
          username: GITHUB_USERNAME,
          publicRepos: githubData.public_repos ?? 0,
          followers: githubData.followers ?? 0,
          following: githubData.following ?? 0,
          totalStars: 0, // We'd need to fetch repos to get total stars
          profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        });
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load programming profiles."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAllStats();
  }, []);

  return (
    <section id="programming" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Programming"
          title="Coding Stats"
          subtitle="A real-time view of my algorithm practice and coding presence."
        />

        {/* Tab Selection Buttons */}
        <div className="mb-8 flex gap-4 justify-center">
          <button
            onClick={() => setSelectedTab("leetcode")}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition ${
              selectedTab === "leetcode"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-white/10 text-muted-foreground hover:bg-white/20"
            }`}
          >
            <Code2 className="h-5 w-5" />
            LeetCode
          </button>
          <button
            onClick={() => setSelectedTab("github")}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition ${
              selectedTab === "github"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-white/10 text-muted-foreground hover:bg-white/20"
            }`}
          >
            <Github className="h-5 w-5" />
            GitHub
          </button>
        </div>

        {loading ? (
          <div className="glass col-span-full rounded-3xl p-12 text-center text-sm text-muted-foreground">
            Loading stats...
          </div>
        ) : error ? (
          <div className="glass col-span-full rounded-3xl p-12 text-center text-sm text-destructive">
            {error}
          </div>
        ) : selectedTab === "leetcode" && leetcodeStats ? (
          <LeetCodeView stats={leetcodeStats} />
        ) : selectedTab === "github" && githubStats ? (
          <GitHubView stats={githubStats} />
        ) : null}
      </div>
    </section>
  );
}

function LeetCodeView({ stats }: { stats: LeetCodeStats }) {
  return (
    <div className="flex items-center justify-center">
      <ComputerScreen>
        <div className="h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-10 flex flex-col justify-between">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">LeetCode</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">@{stats.username}</p>
          </div>

          {/* Main Stats - Larger & Cleaner */}
          <div className="space-y-8 text-center flex-grow flex flex-col justify-center">
            <div>
              <div className="text-6xl font-bold text-primary mb-2">{stats.totalSolved}</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Problems Solved</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">{stats.ranking > 0 ? `#${stats.ranking}` : '—'}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Ranking</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">{stats.submissionCount}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Submissions</div>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            View Profile
          </a>
        </div>
      </ComputerScreen>
    </div>
  );
}

function GitHubView({ stats }: { stats: GitHubStats }) {
  return (
    <div className="flex items-center justify-center">
      <ComputerScreen>
        <div className="h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-10 flex flex-col justify-between">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">GitHub</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">@{stats.username}</p>
          </div>

          {/* Main Stats - Larger & Cleaner */}
          <div className="space-y-8 text-center flex-grow flex flex-col justify-center">
            <div>
              <div className="text-6xl font-bold text-primary mb-2">{stats.publicRepos}</div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Repositories</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">{stats.followers}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">{stats.following}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Following</div>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            View Profile
          </a>
        </div>
      </ComputerScreen>
    </div>
  );
}

function ComputerScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Monitor Bezel */}
      <div className="rounded-2xl border-8 border-gray-700 bg-black shadow-2xl" style={{aspectRatio: "16/10"}}>
        {/* Screen */}
        {children}
      </div>
      
      {/* Stand */}
      <div className="mx-auto mt-2 h-3 w-2/3 rounded-b-lg bg-gradient-to-r from-gray-600 to-gray-700"></div>
      <div className="mx-auto h-8 w-1/3 rounded-b-2xl bg-gradient-to-r from-gray-700 to-gray-800"></div>
    </div>
  );
}
