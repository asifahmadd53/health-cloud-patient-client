import { View, Text, TouchableOpacity } from "react-native"
import UploadBox from "../../components/UploadBox"
import DocumentCard from "../../components/DocumentCard"

export default function DoctorPrescriptions({
  onBrowse,
  onSeeAll,
  uploader,
}: {
  onBrowse: () => void
  onSeeAll: () => void
  uploader: ReturnType<typeof import("../../hooks/useDocumentUploader").useDocumentUploader>
}) {
  const { docs, remove, status } = uploader

  const recentDocs = docs.slice(0, 3)

  return (
    <View>
      <UploadBox title="Upload Prescription" onBrowse={onBrowse} />

      <View className="flex-row justify-between items-center px-2 mt-6 mb-3">
        <Text className="text-base font-semibold">Recent Prescriptions</Text>
        {docs.length > 3 && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text className="text-secondary underline font-medium">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentDocs.length === 0 && (
        <View className="items-center py-8">
          <Text className="text-gray-400 text-sm">No prescriptions uploaded yet</Text>
        </View>
      )}

      {recentDocs.map((item) => (
        <DocumentCard
          key={item.id}
          name={item.name}
          progress={item.progress ?? 0}
          isUploading={status === "uploading"}
          onRemove={() => remove(item.id)}
        />
      ))}
    </View>
  )
}
