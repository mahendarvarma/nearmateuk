export const USER_TYPE_OPTIONS = [
  { id: 'student', label: 'Student', description: 'Looking for roommates and connections' },
  { id: 'citizen', label: 'Citizen', description: 'Help international students settle in' }
] as const

export const INTEREST_OPTIONS = [
  'Technology', 'Sports', 'Music', 'Art', 'Travel', 'Reading', 
  'Gaming', 'Cooking', 'Photography', 'Fitness', 'Movies', 'Fashion',
  'Science', 'Business', 'Languages', 'Nature'
] as const

export const SKILL_OPTIONS = [
  'Programming', 'Design', 'Writing', 'Marketing', 'Finance', 
  'Research', 'Public Speaking', 'Leadership', 'Data Analysis'
] as const

export const GOAL_OPTIONS = [
  'Get an internship', 'Build network', 'Learn new skills',
  'Find study partners', 'Start a business', 'Travel UK',
  'Join societies', 'Improve grades', 'Help international students',
  'Share local knowledge', 'Mentor students'
] as const

export const CITIZEN_EXPERTISE_OPTIONS = [
  'Local Area Knowledge', 'Housing Market', 'Job Market',
  'Language Support', 'Cultural Integration', 'Networking',
  'Legal/Visa Advice', 'Academic Guidance', 'Career Mentoring'
] as const

export const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic',
  'Hindi', 'Urdu', 'Bengali', 'Russian', 'Dutch'
] as const

export const SLEEP_SCHEDULE_OPTIONS = [
  'Early Bird', 'Night Owl', 'Flexible'
] as const

export const CLEANLINESS_OPTIONS = [
  'Very Tidy', 'Moderately Tidy', 'Relaxed'
] as const

export const SOCIAL_LEVEL_OPTIONS = [
  'Introverted', 'Moderately Social', 'Very Social'
] as const

export const STUDY_HABITS_OPTIONS = [
  'Library Lover', 'Home Study', 'Group Study', 'Mixed'
] as const

export const BUDGET_OPTIONS = [
  '£400-600', '£600-800', '£800-1000', '£1000+'
] as const

export const LOCATION_OPTIONS = [
  'Near Campus', 'City Center', 'Quiet Area', 'Flexible'
] as const

export const ROOM_TYPE_OPTIONS = [
  'Private Room', 'Shared Room', 'Studio', 'Flexible'
] as const

export const POST_TYPE_FILTERS = [
  { id: 'all', label: 'All Posts' },
  { id: 'roommate', label: 'Roommates' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'help', label: 'Help' },
  { id: 'discussion', label: 'Discussion' },
] as const
