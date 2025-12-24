import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* ================= TYPES ================= */

type ViewType = 'categories' | 'posts' | 'detail';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}

interface Author {
  name: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  categoryId: string;
  createdAt: number;
  likes: number;
  views: number;
  pinned: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: number;
  likes: number;
}

/* ================= HELPERS ================= */

const timeAgo = (ts: number) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

/* ================= INITIAL DATA ================= */

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything and everything', icon: '💬', color: '#DBEAFE', postCount: 234 },
  { id: '2', name: 'Help & Support', description: 'Get help with technical issues', icon: '🆘', color: '#DCFCE7', postCount: 156 },
  { id: '3', name: 'Feature Requests', description: 'Share ideas for improvements', icon: '💡', color: '#FEF9C3', postCount: 89 },
  { id: '4', name: 'Show & Tell', description: 'Showcase your projects', icon: '🎨', color: '#F3E8FF', postCount: 124 },
  { id: '5', name: 'News & Updates', description: 'Latest announcements', icon: '📰', color: '#FEE2E2', postCount: 67 },
  { id: '6', name: 'Community Events', description: 'Meetups and gatherings', icon: '🎉', color: '#FCE7F3', postCount: 45 },
];

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to the forum!',
    content: 'Introduce yourself here.',
    author: { name: 'Admin' },
    categoryId: '1',
    createdAt: Date.now() - 7200000,
    likes: 20,
    views: 120,
    pinned: true,
    tags: ['welcome'],
  },
];

/* ================= MAIN ================= */

export default function ForumApp() {
  const [view, setView] = useState<ViewType>('categories');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  /* ================= STORAGE ================= */

  useEffect(() => {
    AsyncStorage.getItem('forumData').then(data => {
      if (data) {
        const parsed = JSON.parse(data);
        setCategories(parsed.categories);
        setPosts(parsed.posts);
        setComments(parsed.comments);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      'forumData',
      JSON.stringify({ categories, posts, comments })
    );
  }, [categories, posts, comments]);

  /* ================= BACK HANDLER ================= */

  useEffect(() => {
    const onBackPress = () => {
      if (showModal) {
        setShowModal(false);
        return true;
      }

      if (view === 'detail') {
        setView('posts');
        setSelectedPost(null);
        return true;
      }

      if (view === 'posts') {
        setView('categories');
        setSelectedCategory(null);
        setSearch('');
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backHandler.remove();
  }, [view, showModal]);

  /* ================= SEARCH LOGIC ================= */

  const filteredCategories = categories.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  const filteredPosts = posts
    .filter(p => {
      if (!selectedCategory) return true;
      return p.categoryId === selectedCategory.id;
    })
    .filter(p => {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  /* ================= CREATE POST ================= */

  const createPost = () => {
    if (!title || !content || !selectedCategory) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      author: { name: 'You' },
      categoryId: selectedCategory.id,
      createdAt: Date.now(),
      likes: 0,
      views: 0,
      pinned: false,
      tags: tags.split(',').map(t => t.trim()),
    };

    setPosts(prev => [newPost, ...prev]);
    setCategories(prev =>
      prev.map(c =>
        c.id === selectedCategory.id
          ? { ...c, postCount: c.postCount + 1 }
          : c
      )
    );

    setShowModal(false);
    setTitle('');
    setContent('');
    setTags('');
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Discussion Forum</Text>
          <Text style={styles.headerSubtitle}>
            Share ideas, ask questions, connect
          </Text>
        </View>

        <TouchableOpacity
          style={styles.newPostBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.newPostText}>＋ New Post</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search discussions..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* CATEGORIES */}
      {view === 'categories' && (
        <>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Browse Categories</Text>
            <Text style={styles.categorySubtitle}>
              Choose a category to explore discussions
            </Text>
          </View>

          <FlatList
            data={filteredCategories}
            numColumns={2}
            keyExtractor={item => item.id}
            columnWrapperStyle={{ gap: 14 }}
            contentContainerStyle={{ gap: 14 }}
            renderItem={({ item }) => (
              <View style={styles.categoryCard}>
                {/* TOP */}
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                {/* MIDDLE */}
                <View>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.footerText}>
                      💬 {item.postCount} posts
                    </Text>
                    <Text style={styles.footerText}>📈 Active</Text>
                  </View>
                </View>

                {/* BOTTOM */}
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => {
                    setSelectedCategory(item);
                    setView('posts');
                  }}
                >
                  <Text style={styles.viewBtnText}>View Posts</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {/* POSTS */}
      {view === 'posts' && selectedCategory && (
        <>
          <TouchableOpacity onPress={() => setView('categories')}>
            <Text style={styles.back}>← Back to Categories</Text>
          </TouchableOpacity>

          <FlatList
            data={filteredPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.post}
                onPress={() => {
                  setSelectedPost(item);
                  setView('detail');
                }}
              >
                {item.pinned && <Text style={styles.pinned}>📌 PINNED</Text>}
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2}>{item.content}</Text>
                <Text style={styles.muted}>
                  {item.author.name} · {timeAgo(item.createdAt)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* CREATE POST MODAL */}
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.headerTitle}>New Post</Text>

          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Content"
            style={[styles.input, { height: 100 }]}
            multiline
            value={content}
            onChangeText={setContent}
          />
          <TextInput
            placeholder="Tags (comma separated)"
            style={styles.input}
            value={tags}
            onChangeText={setTags}
          />

          <TouchableOpacity style={styles.submit} onPress={createPost}>
            <Text style={styles.submitText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.back}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 14 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { color: '#6B7280', marginTop: 4 },

  newPostBtn: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  newPostText: { color: '#fff', fontWeight: 'bold' },

  searchBox: { marginTop: 14, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12 },
  searchInput: { padding: 12, fontSize: 15 },

  categoryHeader: { marginVertical: 18 },
  categoryTitle: { fontSize: 22, fontWeight: 'bold' },
  categorySubtitle: { color: '#6B7280', marginTop: 4 },

  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between', // 🔥 alignment fix
  },

  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  icon: { fontSize: 22 },

  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#6B7280', marginTop: 4 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  footerText: { color: '#6B7280', fontSize: 13 },

  viewBtn: {
    marginTop: 12,
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBtnText: {
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '600',
  },

  post: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginVertical: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  muted: { color: '#6B7280', marginTop: 4 },

  pinned: { color: '#B45309', fontWeight: 'bold' },
  back: { color: '#2563EB', marginVertical: 12 },

  modal: { padding: 16 },
  input: { backgroundColor: '#E5E7EB', padding: 12, borderRadius: 8, marginVertical: 6 },
  submit: { backgroundColor: '#2563EB', padding: 14, borderRadius: 8, marginTop: 10 },
  submitText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
