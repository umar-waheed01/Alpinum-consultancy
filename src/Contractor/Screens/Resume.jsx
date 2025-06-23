import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import TopHeader from "../../Components/TopHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import RNPickerSelect from "react-native-picker-select";
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import { useNavigation } from "@react-navigation/native";

export default function Resume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation()
  

  const [formData, setFormData] = useState({
    experience: "",
    rate: "",
    currency: "",
    country: "",
    city: "",
    maxDays: "",
    willingToRelocate: "",
    availability: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setSelectedFile(file); 
      } else {
        setSelectedFile(null); 
      }
    } catch (error) {
      console.warn("File selection failed:", error);
      Alert.alert("Error", "Could not select file.");
    }
  };

  const handleInputChange = (name, value) => {
    if (["experience", "maxDays", "rate"].includes(name)) {
      value = Math.max(
        0,
        Math.min(name === "experience" ? 50 : 5, Number(value))
      );
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  const {
    experience,
    rate,
    currency,
    country,
    city,
    maxDays,
    willingToRelocate,
    availability,
  } = formData;

  if (
    !experience ||
    !rate ||
    !currency ||
    !country ||
    !city ||
    !maxDays ||
    !willingToRelocate ||
    !selectedFile
  ) {
    Alert.alert("Validation Error", "Please fill all fields and select a resume.");
    return;
  }

  setIsLoading(true);

  try {
  const fileInfo = await FileSystem.uploadAsync(
    "https://alpinum-consulting.vercel.app/api/parse-resume",
    selectedFile.uri,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "resume",
    }
  );
  console.log("fileInfo++++++",fileInfo)

  const parsed = JSON.parse(fileInfo.body);
  console.log("parsed+++++",parsed)

  navigation.navigate("ResumeDetail", {
    parsedResume: parsed,
    formData: {
    ...formData,
    availability: formData.availability.toISOString(), 
  },
    token,
    uploadedFiles: selectedFile,
  });

} catch (err) {
  console.error("Upload/Parsing error:", err);
  setIsLoading(false);
  Alert.alert("Error", "Could not upload and parse resume.");
}

};


  const DownloadResumeTemplate = async () => {
  const fileName = 'Resume_Format.docx';
  const fileUrl = 'https://alpinum-consulting-bucket.s3.eu-north-1.amazonaws.com/Resume_Format.docx';
  const filePath = FileSystem.documentDirectory + fileName;

  try {
    const result = await FileSystem.downloadAsync(fileUrl, filePath);
    console.log('✅ File downloaded to:', result.uri);

    Alert.alert('Download Complete', 'Resume template downloaded successfully.');

    save(result.uri);
  } catch (error) {
    console.error('❌ Download Error:', error);
    Alert.alert('Download Failed', 'Could not download the resume template. Please try again.');
  }
};

const save = (uri) =>{
  shareAsync(uri);
} 

  return (
    <View style={{ flex: 1 }}>
      <TopHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.verticalLine} />
          <Text style={styles.title}>Upload Resume</Text>
        </View>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={DownloadResumeTemplate}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="download-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.downloadText}>Download Resume Template</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Resume File</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleChooseFile}
        >
          <View style={styles.inner}>
            <Text style={styles.docsText}>Docs</Text>
            <Text style={styles.uploadText}>Choose File</Text>
            <Text style={styles.fileName} numberOfLines={1}>
              {selectedFile ? selectedFile.name : "No file chosen"}
            </Text>
          </View>
        </TouchableOpacity>

        <Text>Total Years of Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your total years of experience"
          keyboardType="numeric"
          value={formData.experience.toString()}
          onChangeText={(val) => handleInputChange("experience", val)}
        />

        <Text>Are You Willing to Relocate?</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            handleInputChange("willingToRelocate", value)
          }
          value={formData.willingToRelocate}
          placeholder={{ label: "Select", value: "" }}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
        />

        <Text>Expected Rate Per Hour</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Expected Rate Per Hour"
          keyboardType="numeric"
          value={formData.rate.toString()}
          onChangeText={(val) => handleInputChange("rate", val)}
        />

        <Text>Currency</Text>
        <RNPickerSelect
          onValueChange={(value) => handleInputChange("currency", value)}
          value={formData.currency}
          placeholder={{
            label: "Select Currency",
            value: "",
          }}
          items={[
            { label: "USD", value: "USD" },
            { label: "GBP", value: "GBP" },
            { label: "EUR", value: "EUR" },
            { label: "INR", value: "INR" },
            { label: "AUD", value: "AUD" },
            { label: "CAD", value: "CAD" },
          ]}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
        />

        <Text>Maximum Working Days in Office</Text>
        <TextInput
          style={styles.input}
          placeholder="Max Days in Office (0-5)"
          keyboardType="numeric"
          value={formData.maxDays.toString()}
          onChangeText={(val) => handleInputChange("maxDays", val)}
        />

        <Text>Your Availability Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>
            {new Date(formData.availability).toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(formData.availability)}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setFormData({ ...formData, availability: date });
            }}
            minimumDate={new Date()}
          />
        )}

        <Text>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(val) => handleInputChange("city", val)}
        />

        <Text>Country</Text>

        <TextInput
          style={styles.input}
          placeholder="Country"
          value={formData.country}
          onChangeText={(val) => handleInputChange("country", val)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  verticalLine: {
    width: 4,
    height: "100%",
    backgroundColor: "#f47920",
    marginRight: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#f47920",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  inner: {
    alignItems: "center",
  },
  docsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  uploadText: {
    fontSize: 14,
    color: "#f47920",
    marginTop: 5,
  },
  downloadButton: {
    backgroundColor: "#f47920",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  fileName: {
    marginTop: 8,
  fontSize: 13,
  color: "#666",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
