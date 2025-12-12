import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDocumentUploader } from "../../hooks/useDocumentUploader"
import DocumentCard from "../../components/DocumentCard"
import Header from "../../components/Header"

const ITEMS_PER_PAGE = 10

export default function AllPrescriptions({ route }) {
    const { initialDocs = [], status: initialStatus = "idle" } = route.params ?? {};

    const [docs, setDocs] = useState(initialDocs);
    const [status, setStatus] = useState(initialStatus);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const paginatedDocs = docs.slice(0, page * ITEMS_PER_PAGE);
    const hasMore = docs.length > paginatedDocs.length;

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleLoadMore = () => {
        if (!isLoadingMore && hasMore) {
            setIsLoadingMore(true);
            loadMore();
            setTimeout(() => setIsLoadingMore(false), 500);
        }
    };

    const remove = (id: string) => {
        setDocs((prev) => prev.filter((doc) => doc.id !== id));
    };

    const renderFooter = () => {
        if (!hasMore) return null;
        return (
            <View className="py-4 items-center">
                {isLoadingMore ? (
                    <ActivityIndicator size="small" color="#2895cb" />
                ) : (
                    <TouchableOpacity onPress={handleLoadMore}>
                        <Text className="text-secondary font-medium">Load More</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderEmptyState = () => (
        <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-base">No prescriptions found</Text>
            <Text className="text-gray-400 text-sm mt-2">Upload your first prescription to get started</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="All Prescriptions" />
            <View className="flex-1 px-5 pt-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold">Doctor Prescriptions</Text>
                    <Text className="text-gray-500 text-sm">{docs.length} Total</Text>
                </View>

                <FlatList
                    data={paginatedDocs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DocumentCard
                            name={item.name}
                            progress={item.progress ?? 0}
                            isUploading={status === "uploading"}
                            onRemove={() => remove(item.id)}
                        />
                    )}
                    ListEmptyComponent={renderEmptyState}
                    ListFooterComponent={renderFooter}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    );
}
