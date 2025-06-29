import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Lock, Globe, Settings } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

const myGroups = [
  {
    id: 1,
    name: 'Morning Yoga Warriors',
    members: 1247,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    isAdmin: true,
    visibility: 'public',
    newPosts: 5,
  },
  {
    id: 2,
    name: 'Weight Loss Journey',
    members: 892,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    isAdmin: false,
    visibility: 'private',
    newPosts: 2,
  },
  {
    id: 3,
    name: 'HIIT Enthusiasts',
    members: 634,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    isAdmin: false,
    visibility: 'secret',
    newPosts: 0,
  },
];

const pendingRequests = [
  {
    id: 1,
    groupName: 'Runners Club',
    requesterName: 'John Doe',
    requesterAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    time: '2 hours ago',
  },
  {
    id: 2,
    groupName: 'Yoga Masters',
    requesterName: 'Sarah Wilson',
    requesterAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    time: '5 hours ago',
  },
];

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState<'my-groups' | 'requests'>('my-groups');
  const { colors } = useTheme();

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Globe size={16} color="#10B981" />;
      case 'private':
        return <Users size={16} color="#F59E0B" />;
      case 'secret':
        return <Lock size={16} color="#EF4444" />;
      default:
        return <Globe size={16} color="#10B981" />;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 20,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Poppins-Bold',
      color: colors.text,
    },
    createButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
    },
    groupsList: {
      paddingHorizontal: 20,
      gap: 16,
    },
    groupCard: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    groupImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      marginRight: 12,
    },
    groupInfo: {
      flex: 1,
      justifyContent: 'space-between',
    },
    groupHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    groupName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    settingsButton: {
      padding: 4,
    },
    groupMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    groupMembers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    membersText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    groupVisibility: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    visibilityText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    adminBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.warning + '20',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      marginBottom: 4,
    },
    adminText: {
      fontSize: 10,
      fontFamily: 'Inter-Medium',
      color: colors.warning,
    },
    newPostsBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.info + '20',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },
    newPostsText: {
      fontSize: 10,
      fontFamily: 'Inter-Medium',
      color: colors.info,
    },
    requestsList: {
      paddingHorizontal: 20,
      gap: 16,
    },
    requestCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    requesterAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
    },
    requestInfo: {
      flex: 1,
      marginRight: 12,
    },
    requestText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      lineHeight: 20,
      marginBottom: 4,
    },
    requesterName: {
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    groupNameText: {
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
    requestTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    requestActions: {
      gap: 8,
    },
    approveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    approveText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.background,
    },
    declineButton: {
      backgroundColor: colors.surfaceVariant,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    declineText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Groups</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/groups/create')}
        >
          <Plus size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my-groups' && styles.activeTab]}
          onPress={() => setActiveTab('my-groups')}
        >
          <Text style={[styles.tabText, activeTab === 'my-groups' && styles.activeTabText]}>
            My Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests ({pendingRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'my-groups' ? (
          <View style={styles.groupsList}>
            {myGroups.map((group) => (
              <TouchableOpacity 
                key={group.id} 
                style={styles.groupCard}
                onPress={() => router.push({ pathname: '/groups/[id]', params: { id: group.id }})}
              >
                <Image source={{ uri: group.image }} style={styles.groupImage} />
                <View style={styles.groupInfo}>
                  <View style={styles.groupHeader}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    {group.isAdmin && (
                      <TouchableOpacity 
                        style={styles.settingsButton}
                        onPress={() => router.push({ pathname: '/groups/admin/[id]', params: { id: group.id }})}
                      >
                        <Settings size={16} color={colors.textSecondary} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.groupMeta}>
                    <View style={styles.groupMembers}>
                      <Users size={14} color={colors.textSecondary} />
                      <Text style={styles.membersText}>{group.members} members</Text>
                    </View>
                    <View style={styles.groupVisibility}>
                      {getVisibilityIcon(group.visibility)}
                      <Text style={styles.visibilityText}>
                        {group.visibility.charAt(0).toUpperCase() + group.visibility.slice(1)}
                      </Text>
                    </View>
                  </View>
                  {group.isAdmin && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminText}>Admin</Text>
                    </View>
                  )}
                  {group.newPosts > 0 && (
                    <View style={styles.newPostsBadge}>
                      <Text style={styles.newPostsText}>{group.newPosts} new posts</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.requestsList}>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <Image source={{ uri: request.requesterAvatar }} style={styles.requesterAvatar} />
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestText}>
                      <Text style={styles.requesterName}>{request.requesterName}</Text>
                      {' wants to join '}
                      <Text style={styles.groupNameText}>{request.groupName}</Text>
                    </Text>
                    <Text style={styles.requestTime}>{request.time}</Text>
                  </View>
                  <View style={styles.requestActions}>
                    <TouchableOpacity style={styles.approveButton}>
                      <Text style={styles.approveText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineButton}>
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No pending requests</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

