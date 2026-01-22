import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import {
  Building2,
  Briefcase,
  TrendingUp,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  company: string;
  role: string;
  level: string;
  author: string;
  authorPicture: string;
  content: string;
  tags: string[];
  createdAt: string;
  isAnonymous: boolean;
}

// Generate fake post data
const generateFakePost = (id: string): Post => {
  const companies = ["Google", "Meta", "Amazon", "Microsoft", "Apple"];
  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer"];
  const levels = ["Junior", "Mid-Level", "Senior", "Lead"];
  const techStacks = ["React", "Python", "Node.js", "AWS", "Docker", "TypeScript"];

  const postNum = parseInt(id.replace('post-', ''));
  const company = companies[postNum % companies.length];
  const role = roles[postNum % roles.length];
  const level = levels[postNum % levels.length];
  const isAnonymous = postNum % 2 === 0;

  return {
    id,
    title: `My ${role} interview experience at ${company}`,
    company,
    role,
    level,
    author: isAnonymous ? "Anonymous" : `User ${postNum}`,
    authorPicture: isAnonymous ? "" : `https://i.pravatar.cc/150?img=${postNum}`,
    content: `I recently completed the interview process for a ${role} position at ${company} and wanted to share my experience to help others who might be preparing for similar interviews.

## Application and Initial Contact

I applied through ${company}'s career portal and heard back within a week. The recruiter was very friendly and explained the entire interview process upfront, which consisted of 4-5 rounds depending on performance. They were transparent about the timeline and what to expect at each stage.

## Round 1: Phone Screen with Recruiter (30 minutes)

The first round was a casual conversation with the recruiter. They asked about my background, why I was interested in ${company}, and what I was looking for in my next role. They also explained the team structure, the tech stack (primarily ${techStacks[postNum % techStacks.length]} and ${techStacks[(postNum + 1) % techStacks.length]}), and the day-to-day responsibilities.

Key topics covered:
- My previous work experience and projects
- Salary expectations and notice period
- Availability for upcoming interview rounds
- Questions I had about the role and company

## Round 2: Technical Assessment (90 minutes)

This was a timed coding challenge on their platform. I had to solve 2 medium-level and 1 hard-level DSA problems. The questions focused on arrays, hashmaps, and tree traversal. Time management was crucial here.

Tips for this round:
- Practice on LeetCode/HackerRank beforehand
- Write clean, well-commented code
- Test your solutions with edge cases
- Don't spend too much time on one problem

## Round 3: Technical Interview 1 - Coding (60 minutes)

This was a live coding session with a senior engineer. I had to solve two problems while explaining my thought process. The interviewer was interested in how I approached the problem, not just the final solution.

Questions asked:
- One medium-level string manipulation problem
- One problem involving graph traversal
- Discussion about time and space complexity
- How I would optimize my solutions

The interviewer was very supportive and gave hints when I was stuck. They were more interested in my problem-solving approach than getting the perfect solution immediately.

## Round 4: Technical Interview 2 - System Design (60 minutes)

For this round, I had to design a scalable system. The problem was to design a URL shortening service (similar to bit.ly). This round tested my understanding of:

- High-level architecture and component design
- Database schema design
- API design and endpoints
- Scalability considerations
- Handling of edge cases and failures

I made sure to ask clarifying questions about scale, expected traffic, and requirements before diving into the design. The interviewer appreciated the questions and the discussion was very collaborative.

## Round 5: Behavioral and Cultural Fit (45 minutes)

The final round was with the hiring manager. This was a mix of behavioral questions and discussions about team culture. They used the STAR method for most questions.

Questions included:
- Tell me about a time you faced a difficult technical challenge
- Describe a situation where you had to work with a difficult team member
- How do you handle conflicting priorities and tight deadlines?
- What are you looking for in your next role?
- Why ${company}?

I prepared stories from my past experiences and made sure to highlight what I learned from each situation.

## Interview Results and Offer

I received feedback within 3 days of the final round. The recruiter called to let me know I had passed all rounds and would be receiving an offer. The offer came within a week and included:

- Base salary for ${level} level
- Annual performance bonus
- Stock options/RSUs
- Standard benefits package

The entire process from application to offer took about 3 weeks, which was faster than I expected.

## Preparation Resources

Here are the resources I used to prepare:

- LeetCode Premium for coding practice (focused on ${company} tagged questions)
- "Cracking the Coding Interview" for DSA concepts
- "System Design Interview" by Alex Xu for system design
- Company reviews on Glassdoor and Blind
- ${techStacks[postNum % techStacks.length]} documentation and best practices

## Tips for Success

1. **Start early**: Give yourself at least 2-3 weeks to prepare properly
2. **Practice coding out loud**: This helps in explaining your thought process during interviews
3. **Ask questions**: Clarify requirements before jumping into solutions
4. **Be honest**: If you don't know something, say so and explain how you would find the answer
5. **Show enthusiasm**: Let them know why you're excited about the role and company
6. **Follow up**: Send thank-you emails after each round

## Overall Experience

The interview process at ${company} was well-organized and respectful of my time. The interviewers were professional, friendly, and genuinely interested in getting to know me beyond just my technical skills. Even though it was challenging, I felt it was a fair assessment of my abilities.

I'm excited to start this new role and would definitely recommend ${company} to other engineers looking for opportunities in this space. If you have any specific questions about the interview process, feel free to reach out!

Good luck to everyone preparing for their interviews!`,
    tags: [
      techStacks[postNum % techStacks.length],
      techStacks[(postNum + 1) % techStacks.length],
      techStacks[(postNum + 2) % techStacks.length],
    ],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    isAnonymous,
  };
};

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // TODO: Replace with your actual backend URL
        const postUrl = `YOUR_BACKEND_API_URL/posts/${id}`;
        
        const response = await fetch(postUrl);
        
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          // If API fails or returns empty, use fake data
          console.log('Using fake data for post');
          const fakePost = generateFakePost(id);
          setPost(fakePost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        // Fallback to fake data on error
        const fakePost = generateFakePost(id);
        setPost(fakePost);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Back Button */}
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to all posts</span>
          </Link>

          {/* Main Post Card */}
          <article className="bg-white rounded-lg shadow-sm p-8">
            {/* Author Info */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                {post.isAnonymous ? (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-600" />
                  </div>
                ) : (
                  <img
                    src={post.authorPicture}
                    alt={post.author}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition ${
                    isBookmarked
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="Bookmark"
                >
                  <Bookmark size={20} fill={isBookmarked ? "white" : "none"} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 size={18} />
                <span className="font-medium">{post.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={18} />
                <span>{post.role}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <TrendingUp size={18} />
                <span>{post.level}</span>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Post Content */}
            <div className="prose prose-gray max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('1. **') || paragraph.startsWith('2. **') || paragraph.startsWith('3. **') || paragraph.startsWith('4. **')) {
                  const match = paragraph.match(/\d+\. \*\*(.*?)\*\* - (.*)/);
                  if (match) {
                    return (
                      <div key={index} className="mb-3">
                        <span className="font-semibold text-gray-900">{match[1]}</span>
                        <span className="text-gray-700"> - {match[2]}</span>
                      </div>
                    );
                  }
                  return <p key={index} className="text-gray-700 mb-3">{paragraph}</p>;
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-700 ml-6 mb-2">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </article>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((num) => {
                const relatedId = `post-${parseInt(id?.replace('post-', '') || '1') + num}`;
                const relatedPost = generateFakePost(relatedId);
                
                return (
                  <Link
                    key={relatedId}
                    to={`/posts/${relatedId}`}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>{relatedPost.company}</span>
                      <span>•</span>
                      <span>{relatedPost.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePost;