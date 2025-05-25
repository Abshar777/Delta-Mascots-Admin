import { NavItem } from '@/types';
import { BlogPost } from '@/types/IBlogPost';



//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },

 
  {
    title: 'Schemas',
    url: '/admin/schema',
    icon: 'object',
    shortcut: ['p', 'p'],
    isActive: false,
    
  },
  {
    title: 'Data',
    url: '/admin/data',
    icon: 'data',
    shortcut: ['p', 'p'],
    isActive: false,
    
  },

  // {
  //   title: 'Banner',
  //   url: '#',
  //   icon: 'kanban',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [
  //     {
  //       title: 'Create Banner',
  //       url: '/admin/banner/create',
  //       icon: 'product',
  //       shortcut: ['p', 'p'],
  //       isActive: false,
  //     },
  //     {
  //       title: 'Banner List',
  //       url: '/admin/banner',
  //       icon: 'product',
  //       shortcut: ['p', 'p'],
  //       isActive: false,
  //     },
  //   ] // No child items
  // },
  // {
  //   title: 'Home Page Sections',
  //   url: '#',
  //   icon: 'section',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [
  //     {
  //       title: 'Create section',
  //       url: '/admin/section/create',
  //       icon: 'product',
  //       shortcut: ['p', 'p'],
  //       isActive: false,
  //     },
  //     {
  //       title: 'Section List',
  //       url: '/admin/section',
  //       icon: 'product',
  //       shortcut: ['p', 'p'],
  //       isActive: false,
  //     },
  //   ] // No child items
  // },
  // {
  //   title: 'chat',
  //   url: '/admin/chat',
  //   icon: 'chat',
  //   shortcut: ['p', 'p'],
  //   isActive: false,

  // },

];


export const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Blog Post 1",
    content: "<p>This is the first blog post</p>",
    coverImage: "/placeholder.webp",
    createdAt: "2021-01-01",
  },
  {
    id: "2",
    title: "Blog Post 1",
    content: "<p>This is the first blog post</p>",
    coverImage: "/placeholder.webp",
    createdAt: "2021-01-01",
  },
  {
    id: "3",
    title: "Blog Post 1",
    content: "<p>This is the first blog post</p>",
    coverImage: "/placeholder.webp",
    createdAt: "2021-01-01",
  },
  {
    id: '4',
    title: "Blog Post 1",
    content: "<p>This is the first blog post</p>",
    coverImage: "/placeholder.webp",
    createdAt: "2021-01-01",
  },
 
];






