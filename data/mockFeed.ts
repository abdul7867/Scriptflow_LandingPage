export interface InstagramPost {
    id: string;
    username: string;
    avatarColor: string;
    type: 'image' | 'video';
    aspectRatio: string; // Tailwind class like 'aspect-square' or 'aspect-[4/5]'
    likes: string;
    caption: string;
    comments: string;
    timeAgo: string;
}

export const mockFeed: InstagramPost[] = [
    {
        id: 'post-1',
        username: 'alex_creator',
        avatarColor: 'bg-indigo-500',
        type: 'image',
        aspectRatio: 'aspect-square',
        likes: '1,240',
        caption: 'The secret to viral growth is less about luck and more about...',
        comments: 'View all 42 comments',
        timeAgo: '2h'
    },
    {
        id: 'post-2',
        username: 'design_daily',
        avatarColor: 'bg-emerald-500',
        type: 'video',
        aspectRatio: 'aspect-[4/5]',
        likes: '8,902',
        caption: 'New workflow just dropped. Link in bio 🚀',
        comments: 'View all 128 comments',
        timeAgo: '5h'
    },
    {
        id: 'post-3',
        username: 'ui_movement',
        avatarColor: 'bg-purple-600',
        type: 'image',
        aspectRatio: 'aspect-square',
        likes: '3,432',
        caption: 'Clean interfaces are timeless. #uidesign #minimal',
        comments: 'View all 85 comments',
        timeAgo: '1d'
    },
    {
        id: 'post-4',
        username: 'startup_hustle',
        avatarColor: 'bg-orange-500',
        type: 'video',
        aspectRatio: 'aspect-[4/5]',
        likes: '12K',
        caption: 'Day 1 of building my SaaS. Follow the journey.',
        comments: 'View all 320 comments',
        timeAgo: '2d'
    }
];
