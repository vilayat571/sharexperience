  
  export const tabs = [
    { name: 'Frontend', icon: '💻' },
    { name: 'Backend', icon: '⚙️' },
    { name: 'Full Stack', icon: '🔧' },
    { name: 'DevOps', icon: '🚀' },
    { name: 'Mobile', icon: '📱' },
    { name: 'Data Science', icon: '📊' },
    { name: 'QA/Testing', icon: '🧪' },
    { name: 'Security', icon: '🔒' },
    { name: 'Cloud', icon: '☁️' },
    { name: 'AI/ML', icon: '🤖' }
  ];

  export const techStacksByRole: Record<string, string[]> = {
    'Frontend': ['React', 'Vue', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind', 'Redux'],
    'Backend': ['Node.js', 'Python', 'Java', 'Go', 'C#', 'Ruby', 'PHP', 'Spring Boot', 'Django', 'Express'],
    'Full Stack': ['MERN', 'MEAN', 'Django + React', 'Ruby on Rails', 'Laravel', 'Next.js', 'Remix', 'T3 Stack'],
    'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Ansible', 'CI/CD', 'GitLab', 'Azure'],
    'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Xamarin', 'Ionic'],
    'Data Science': ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'SQL', 'Tableau', 'Spark'],
    'QA/Testing': ['Selenium', 'Jest', 'Cypress', 'JUnit', 'PyTest', 'Postman', 'JMeter', 'TestNG', 'Playwright'],
    'Security': ['Penetration Testing', 'OWASP', 'Cryptography', 'Network Security', 'Ethical Hacking', 'SIEM', 'Firewall'],
    'Cloud': ['AWS', 'Azure', 'GCP', 'Serverless', 'Lambda', 'S3', 'EC2', 'Cloud Architecture', 'Microservices'],
    'AI/ML': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Deep Learning', 'LLMs', 'Keras']
  };