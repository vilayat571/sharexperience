import React, { useState, useEffect, useReducer } from 'react';
import { Search, Briefcase, Code, Building2, Calendar, TrendingUp, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Experience {
  id: number;
  name: string;
  role: string;
  company: string;
  year: number;
  level: string;
  stack: string[];
  content: string;
  preview: string; // Short preview for main page
}

interface ApiResponse {
  experiences: Experience[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// Reducer for managing all posts data
interface PostsState {
  allPosts: Experience[];
  filteredPosts: Experience[];
}

type PostsAction = 
  | { type: 'SET_ALL_POSTS'; payload: Experience[] }
  | { type: 'SET_FILTERED_POSTS'; payload: Experience[] };

const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'SET_ALL_POSTS':
      return { ...state, allPosts: action.payload };
    case 'SET_FILTERED_POSTS':
      return { ...state, filteredPosts: action.payload };
    default:
      return state;
  }
};

const Allposts: React.FC = () => {
  // Reducer for posts management
  const [postsState, dispatch] = useReducer(postsReducer, {
    allPosts: [],
    filteredPosts: []
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  
  // Filters state
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter options - these will come from API
  const [roles, setRoles] = useState<string[]>(['All']);
  const [levels, setLevels] = useState<string[]>(['All']);
  const [years, setYears] = useState<string[]>(['All']);
  const [companies, setCompanies] = useState<string[]>(['All']);
  const [techStacks, setTechStacks] = useState<string[]>([]);

  // Fetch filter options on component mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Fetch experiences when filters or page changes
  useEffect(() => {
    fetchExperiences();
  }, [currentPage, selectedRole, selectedLevel, selectedYear, selectedCompany, selectedStack, searchQuery]);

  // API: Fetch filter options (roles, levels, companies, etc.)
  const fetchFilterOptions = async () => {
    try {
      // TODO: Replace with your API endpoint
      // const response = await fetch('YOUR_API_URL/api/filters');
      // const data = await response.json();
      // setRoles(['All', ...data.roles]);
      // setLevels(['All', ...data.levels]);
      // setYears(['All', ...data.years]);
      // setCompanies(['All', ...data.companies]);
      // setTechStacks(data.techStacks);

      // FAKE DATA - Remove this when connecting to real API
      setRoles(['All', 'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Mobile', 'Data Science', 'QA/Testing', 'Security', 'Cloud', 'AI/ML']);
      setLevels(['All', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Principal']);
      setYears(['All', '2024', '2023', '2022', '2021', '2020']);
      setCompanies(['All', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Uber', 'Airbnb']);
      setTechStacks(['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'MongoDB', 'PostgreSQL']);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  // API: Fetch experiences with filters and pagination
  const fetchExperiences = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10', // Items per page
        ...(selectedRole !== 'All' && { role: selectedRole }),
        ...(selectedLevel !== 'All' && { level: selectedLevel }),
        ...(selectedYear !== 'All' && { year: selectedYear }),
        ...(selectedCompany !== 'All' && { company: selectedCompany }),
        ...(selectedStack.length > 0 && { stack: selectedStack.join(',') }),
        ...(searchQuery && { search: searchQuery })
      });

      // TODO: Replace with your API endpoint
      // const response = await fetch(`YOUR_API_URL/api/experiences?${params}`);
      // const data: ApiResponse = await response.json();
      // setExperiences(data.experiences);
      // setTotalPages(data.totalPages);
      // setTotalItems(data.totalItems);

      // FAKE DATA - Remove this when connecting to real API
      const fakeData: Experience[] = [
        {
          id: 1,
          name: 'Badradding Bagirli',
          role: 'Frontend Developer',
          company: 'Invertbum LLC',
          year: 2024,
          level: 'Senior',
          stack: ['React', 'TypeScript', 'Tailwind CSS'],
          content: 'The interview process was comprehensive and well-structured. Started with a technical screening followed by a coding challenge focused on React hooks and state management. The team was professional and the questions were fair, testing both theoretical knowledge and practical problem-solving skills.',
          preview: 'The interview process was comprehensive and well-structured. Started with a technical screening followed by a coding challenge...'
        },
        {
          id: 2,
          name: 'Vaqif MANAF',
          role: 'Full Stack Developer',
          company: 'Avian Group CO LLC',
          year: 2024,
          level: 'Mid-level',
          stack: ['Node.js', 'React', 'MongoDB'],
          content: 'I had the chance to interview for a Full Stack Developer position. The process included three rounds: HR screening, technical assessment, and system design. The interviewers were friendly and gave clear feedback. They focused heavily on REST API design and database optimization.',
          preview: 'I had the chance to interview for a Full Stack Developer position. The process included three rounds: HR screening...'
        },
        {
          id: 3,
          name: 'Aliyev Shaig',
          role: 'Backend Developer',
          company: 'AzeSert Halal LLC',
          year: 2023,
          level: 'Junior',
          stack: ['Python', 'Django', 'PostgreSQL'],
          content: 'Great interview experience overall. The technical round included live coding challenges on algorithm optimization and database queries. The panel was supportive and provided hints when I got stuck. Would definitely recommend this company to other developers.',
          preview: 'Great interview experience overall. The technical round included live coding challenges on algorithm optimization...'
        },
        {
          id: 4,
          name: 'Abbas Guliyev',
          role: 'DevOps Engineer',
          company: 'Raja Restaurants LLC',
          year: 2024,
          level: 'Senior',
          stack: ['Docker', 'Kubernetes', 'AWS'],
          content: 'The DevOps interview was thorough, covering CI/CD pipelines, container orchestration, and cloud infrastructure. They gave me a real-world scenario to solve which I appreciated. The team seemed knowledgeable and collaborative. Excellent communication throughout the process.',
          preview: 'The DevOps interview was thorough, covering CI/CD pipelines, container orchestration, and cloud infrastructure...'
        },
        {
          id: 5,
          name: 'Sarah Johnson',
          role: 'Data Scientist',
          company: 'Google',
          year: 2024,
          level: 'Senior',
          stack: ['Python', 'TensorFlow', 'AWS'],
          content: 'Amazing interview experience at Google. Multiple rounds including coding, ML system design, and behavioral. The team was brilliant and the questions were challenging but fair. They really tested deep understanding of ML algorithms and scalability.',
          preview: 'Amazing interview experience at Google. Multiple rounds including coding, ML system design, and behavioral...'
        }
      ];

      // Store all posts in reducer
      dispatch({ type: 'SET_ALL_POSTS', payload: fakeData });

      // Apply filters locally for demo
      let filtered = fakeData;
      if (selectedRole !== 'All') filtered = filtered.filter(e => e.role === selectedRole);
      if (selectedLevel !== 'All') filtered = filtered.filter(e => e.level === selectedLevel);
      if (selectedYear !== 'All') filtered = filtered.filter(e => e.year.toString() === selectedYear);
      if (selectedCompany !== 'All') filtered = filtered.filter(e => e.company === selectedCompany);
      if (selectedStack.length > 0) {
        filtered = filtered.filter(e => selectedStack.some(s => e.stack.includes(s)));
      }
      if (searchQuery) {
        filtered = filtered.filter(e => 
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Store filtered posts in reducer
      dispatch({ type: 'SET_FILTERED_POSTS', payload: filtered });

      setExperiences(filtered);
      setTotalPages(Math.ceil(filtered.length / 10));
      setTotalItems(filtered.length);

    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle tech stack filter toggle
  const toggleTechStack = (tech: string) => {
    setSelectedStack(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
    setCurrentPage(1); // Reset to first page
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1); // Reset to first page on filter change
    
    switch (filterType) {
      case 'role':
        setSelectedRole(value);
        break;
      case 'level':
        setSelectedLevel(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      case 'company':
        setSelectedCompany(value);
        break;
    }
  };

  // Navigate to single post
  const goToPost = (postId: number) => {
    // TODO: Use React Router for navigation
    // navigate(`/post/${postId}`);
    
    // For demo: Store post ID in URL and reload
    window.location.href = `/post/${postId}`;
    
    // Alternative: If using window.open for new tab
    // window.open(`/post/${postId}`, '_blank');
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">Interview Experiences</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-80 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-72 shrink-0">
            <div className="bg-white rounded-xl border border-black p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-black mb-6">Filters</h2>

              {/* Role Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={18} className="text-black" />
                  <h3 className="font-medium text-black">Role</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {roles.map((role) => (
                    <label key={role} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                      <input
                        type="radio"
                        name="role"
                        checked={selectedRole === role}
                        onChange={() => handleFilterChange('role', role)}
                        className="w-4 h-4 text-black focus:ring-black accent-black"
                      />
                      <span className="text-sm text-black">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-black" />
                  <h3 className="font-medium text-black">Level</h3>
                </div>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === level}
                        onChange={() => handleFilterChange('level', level)}
                        className="w-4 h-4 text-black focus:ring-black accent-black"
                      />
                      <span className="text-sm text-black">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Company Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} className="text-black" />
                  <h3 className="font-medium text-black">Company</h3>
                </div>
                <select 
                  value={selectedCompany}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  {companies.map((company) => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-black" />
                  <h3 className="font-medium text-black">Year</h3>
                </div>
                <div className="space-y-2">
                  {years.map((year) => (
                    <label key={year} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                      <input
                        type="radio"
                        name="year"
                        checked={selectedYear === year}
                        onChange={() => handleFilterChange('year', year)}
                        className="w-4 h-4 text-black focus:ring-black accent-black"
                      />
                      <span className="text-sm text-black">{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tech Stack Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code size={18} className="text-black" />
                  <h3 className="font-medium text-black">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStacks.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleTechStack(tech)}
                      className={`px-3 py-1 text-xs rounded-full transition border ${
                        selectedStack.includes(tech)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black hover:bg-gray-100'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Experience Cards */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-black text-lg">Loading experiences...</div>
              </div>
            ) : experiences.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-black text-lg font-semibold mb-2">No experiences found</p>
                  <p className="text-gray-600">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {experiences.length} of {totalItems} experiences
                </div>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-white rounded-xl border border-black p-8 hover:shadow-xl transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-semibold">
                            {exp.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-black">{exp.name}</h3>
                            <p className="text-black font-medium">{exp.role}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">
                                Email: {exp.name.toLowerCase().replace(' ', '.')}@example.com
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-sm text-black">Company:</span>
                              <span className="text-sm font-semibold text-black">{exp.company}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1 bg-black text-white text-sm rounded-full font-medium">
                            {exp.level}
                          </span>
                          <span className="text-sm text-gray-600">{exp.year}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <p className="text-black leading-relaxed line-clamp-3">{exp.preview || exp.content}</p>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-black text-white text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                          onClick={() => goToPost(exp.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                          <span>Read Full Experience</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-black text-black hover:bg-black hover:text-white'
                    } transition`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-4 py-2 rounded-lg border ${
                            currentPage === pageNum
                              ? 'bg-black text-white border-black'
                              : 'border-black text-black hover:bg-black hover:text-white'
                          } transition`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-black text-black hover:bg-black hover:text-white'
                    } transition`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Allposts;