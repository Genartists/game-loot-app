import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

import { loadGiveaways, loadWorth } from "../store/giveawaysSlice";
import {
  setPlatform,
  setType,
  setSortBy,
  setSearch,
  resetFilters,
} from "../store/filtersSlice";
import { save, remove } from "../store/savedSlice";
import Card from "../components/Card";
import TopProgress from "../components/TopProgress";
import FiltersModal from "../modals/FiltersModal";
import Spinner from "../components/Spinner";

const Giveaways = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { list, loading, error } = useSelector((state) => state.giveaways);
  const { platform, type, sortBy, search } = useSelector(
    (state) => state.filters
  );
  const savedItems = useSelector((state) => state.saved.items);

  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const listAnimations = useRef([]);

  // Handle route params for quick filters
  useEffect(() => {
    if (route.params?.platform) {
      dispatch(setPlatform(route.params.platform));
    }
  }, [route.params?.platform]);

  // Handle navigation to Detail from Saved screen
  useEffect(() => {
    if (route.params?.screen === "Detail" && route.params?.params?.id) {
      // Navigate to Detail screen with the provided params
      navigation.navigate("Detail", route.params.params);
    }
  }, [route.params, navigation]);

  // Load giveaways when filters change
  useEffect(() => {
    dispatch(loadGiveaways({ platform, type, "sort-by": sortBy }));
  }, [platform, type, sortBy]);

  // Handle network errors
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  // Initialize animations for list items
  useEffect(() => {
    if (list.length > 0) {
      listAnimations.current = list.map(() => ({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(12),
      }));

      // Animate items in with stagger
      listAnimations.current.forEach((anim, index) => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }, index * 50); // 50ms delay between each item
      });
    }
  }, [list]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadGiveaways({ platform, type, "sort-by": sortBy }));
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    dispatch(setSearch(text));
  };

  const handleLongPress = (item) => {
    const isSaved = savedItems.some((saved) => saved.id === item.id);

    if (isSaved) {
      Alert.alert(
        "Remove from Saved",
        "Are you sure you want to remove this item from your saved list?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => dispatch(remove(item.id)),
          },
        ]
      );
    } else {
      const minimalPayload = {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        platforms: item.platforms || item.platform,
        worth: item.worth,
        type: item.type,
        end_date: item.end_date,
      };
      dispatch(save(minimalPayload));
    }
  };

  const handleSaveToggle = (item, isCurrentlySaved) => {
    if (isCurrentlySaved) {
      // Remove from saved
      dispatch(remove(item.id));
    } else {
      // Add to saved
      const minimalPayload = {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        platforms: item.platforms || item.platform,
        worth: item.worth,
        type: item.type,
        end_date: item.end_date,
      };
      dispatch(save(minimalPayload));
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate("Detail", { id: item.id, title: item.title });
  };

  const openFiltersModal = () => setFiltersModalVisible(true);
  const closeFiltersModal = () => setFiltersModalVisible(false);

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }) => {
    const isSaved = savedItems.some((saved) => saved.id === item.id);
    const anim = listAnimations.current[index];

    if (!anim) return null;

    return (
      <Animated.View
        style={{
          opacity: anim.opacity,
          transform: [{ translateY: anim.translateY }],
        }}
      >
        <Card
          item={item}
          onPress={() => handleItemPress(item)}
          onLongPress={handleLongPress}
          onSaveToggle={handleSaveToggle}
          isSaved={isSaved}
        />
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View
      style={[
        styles.emptyContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Ionicons
        name="game-controller"
        size={64}
        color={theme.colors.textTertiary}
      />
      <Text style={[styles.emptyText, { color: theme.colors.text }]}>
        No giveaways found
      </Text>
      <Text
        style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}
      >
        Try adjusting your filters or search terms
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View
      style={[
        styles.errorContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Ionicons name="alert-circle" size={64} color={theme.colors.error} />
      <Text style={[styles.errorText, { color: theme.colors.text }]}>
        Something went wrong
      </Text>
      <Text
        style={[styles.errorSubtext, { color: theme.colors.textSecondary }]}
      >
        Please check your connection and try again
      </Text>
    </View>
  );

  if (loading && list.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={["top"]}
      >
        <StatusBar
          barStyle={theme.colors.statusBarContent}
          backgroundColor={theme.colors.statusBar}
        />
        <View
          style={[
            styles.loadingContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Spinner />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading giveaways...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <StatusBar
        barStyle={theme.colors.statusBarContent}
        backgroundColor={theme.colors.statusBar}
      />
      <TopProgress visible={loading} />

      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Search giveaways..."
            placeholderTextColor={theme.colors.textTertiary}
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.filtersButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={openFiltersModal}
        >
          <Ionicons name="filter" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {error && list.length === 0 ? (
        renderErrorState()
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
          style={styles.flatList}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <FiltersModal visible={filtersModalVisible} onClose={closeFiltersModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    margin: 16,
    borderWidth: 1,
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  filtersButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 8,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default Giveaways;
