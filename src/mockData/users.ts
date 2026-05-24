import { User } from '@/types'

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    nickname: 'Priya',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    userType: 'student',
    university: 'University of Manchester',
    country: 'India',
    bio: 'Computer Science student passionate about AI and machine learning. Looking for like-minded students to collaborate with!',
    interests: ['Technology', 'Reading', 'Photography', 'Cooking'],
    skills: ['Python', 'Data Science', 'Web Development'],
    goals: ['Get an internship', 'Learn new skills', 'Build network'],
    lifestyle: {
      sleepSchedule: 'Night Owl',
      cleanliness: 'Very Tidy',
      socialLevel: 'Moderately Social',
      studyHabits: 'Library Lover'
    },
    accommodationNeeds: {
      budget: '£600-800',
      location: 'Near Campus',
      moveInDate: 'September 2024',
      roomType: 'Private Room'
    },
    isOnline: true,
    lastActive: 'Now'
  },
  {
    id: '2',
    name: 'James Chen',
    nickname: 'James',
    email: 'james@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    userType: 'student',
    university: 'University of Birmingham',
    country: 'China',
    bio: 'Business student with a love for sports and travel. Always up for exploring new places!',
    interests: ['Sports', 'Travel', 'Music', 'Gaming'],
    skills: ['Marketing', 'Finance', 'Public Speaking'],
    goals: ['Start a business', 'Travel Europe', 'Make friends'],
    lifestyle: {
      sleepSchedule: 'Early Bird',
      cleanliness: 'Moderately Tidy',
      socialLevel: 'Very Social',
      studyHabits: 'Home Study'
    },
    accommodationNeeds: {
      budget: '£600-800',
      location: 'City Center',
      moveInDate: 'October 2024',
      roomType: 'Shared Room'
    },
    isOnline: true,
    lastActive: 'Now'
  },
  {
    id: '3',
    name: 'Sofia Martinez',
    nickname: 'Sofia',
    email: 'sofia@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    userType: 'student',
    university: 'University of Leeds',
    country: 'Spain',
    bio: 'Art and Design student who loves creativity in all forms. Looking for roommates who appreciate quiet study time.',
    interests: ['Art', 'Design', 'Music', 'Yoga'],
    skills: ['Graphic Design', 'Illustration', 'Photography'],
    goals: ['Build portfolio', 'Find creative community', 'Learn new techniques'],
    lifestyle: {
      sleepSchedule: 'Flexible',
      cleanliness: 'Very Tidy',
      socialLevel: 'Moderately Social',
      studyHabits: 'Mixed'
    },
    accommodationNeeds: {
      budget: '£500-700',
      location: 'Quiet Area',
      moveInDate: 'September 2024',
      roomType: 'Private Room'
    },
    isOnline: false,
    lastActive: '2 hours ago'
  },
  {
    id: '4',
    name: 'Sarah Thompson',
    nickname: 'Sarah',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    userType: 'citizen',
    country: 'United Kingdom',
    bio: 'Local resident passionate about helping international students settle in. I can offer accommodation and mentorship!',
    interests: ['Teaching', 'Cooking', 'Gardening', 'Reading'],
    skills: ['Mentoring', 'Language Support', 'Networking'],
    goals: ['Help international students', 'Share local knowledge', 'Build cultural connections'],
    lifestyle: {
      sleepSchedule: 'Early Bird',
      cleanliness: 'Very Tidy',
      socialLevel: 'Very Social',
      studyHabits: 'Home Study'
    },
    accommodationNeeds: {
      budget: 'Flexible',
      location: 'Flexible',
      moveInDate: 'Flexible',
      roomType: 'Flexible'
    },
    citizenProfile: {
      canOfferAccommodation: true,
      canOfferMentorship: true,
      canOfferLanguageHelp: true,
      languagesSpoken: ['English', 'French', 'Spanish'],
      areasOfExpertise: ['Local Area Knowledge', 'Housing Market', 'Cultural Integration']
    },
    isOnline: true,
    lastActive: 'Now'
  },
  {
    id: '5',
    name: 'David Wilson',
    nickname: 'David',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    userType: 'citizen',
    country: 'United Kingdom',
    bio: 'Retired teacher who loves helping students navigate life in the UK. Happy to offer guidance and support!',
    interests: ['Education', 'History', 'Music', 'Travel'],
    skills: ['Teaching', 'Academic Guidance', 'Career Mentoring'],
    goals: ['Mentor students', 'Share wisdom', 'Stay connected with academia'],
    lifestyle: {
      sleepSchedule: 'Early Bird',
      cleanliness: 'Very Tidy',
      socialLevel: 'Moderately Social',
      studyHabits: 'Library Lover'
    },
    accommodationNeeds: {
      budget: 'Flexible',
      location: 'Flexible',
      moveInDate: 'Flexible',
      roomType: 'Flexible'
    },
    citizenProfile: {
      canOfferAccommodation: false,
      canOfferMentorship: true,
      canOfferLanguageHelp: true,
      languagesSpoken: ['English', 'German', 'Italian'],
      areasOfExpertise: ['Academic Guidance', 'Career Mentoring', 'Legal/Visa Advice']
    },
    isOnline: true,
    lastActive: '1 hour ago'
  },
  {
    id: '6',
    name: 'Ahmed Hassan',
    nickname: 'Ahmed',
    email: 'ahmed@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    userType: 'student',
    university: 'University of Edinburgh',
    country: 'Egypt',
    bio: 'Engineering student who enjoys problem-solving and building things. Soccer enthusiast!',
    interests: ['Engineering', 'Soccer', 'Movies', 'Cooking'],
    skills: ['CAD', 'Programming', 'Project Management'],
    goals: ['Graduate with honors', 'Join engineering society', 'Find research opportunities'],
    lifestyle: {
      sleepSchedule: 'Night Owl',
      cleanliness: 'Moderately Tidy',
      socialLevel: 'Very Social',
      studyHabits: 'Group Study'
    },
    accommodationNeeds: {
      budget: '£600-800',
      location: 'Near Campus',
      moveInDate: 'September 2024',
      roomType: 'Shared Room'
    },
    isOnline: true,
    lastActive: 'Now'
  },
  {
    id: '7',
    name: 'Yuki Tanaka',
    nickname: 'Yuki',
    email: 'yuki@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    userType: 'student',
    university: 'University of Glasgow',
    country: 'Japan',
    bio: 'Psychology student fascinated by human behavior. Love cooking Japanese food and watching anime!',
    interests: ['Psychology', 'Cooking', 'Anime', 'Reading'],
    skills: ['Research', 'Data Analysis', 'Writing'],
    goals: ['Complete PhD', 'Publish research', 'Learn about different cultures'],
    lifestyle: {
      sleepSchedule: 'Early Bird',
      cleanliness: 'Very Tidy',
      socialLevel: 'Introverted',
      studyHabits: 'Library Lover'
    },
    accommodationNeeds: {
      budget: '£550-750',
      location: 'Quiet Area',
      moveInDate: 'October 2024',
      roomType: 'Private Room'
    },
    isOnline: false,
    lastActive: '30 minutes ago'
  }
]
