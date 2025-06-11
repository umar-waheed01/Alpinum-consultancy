import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";

const programmingLanguages = ["JavaScript", "Python", "C++", "Java"];
const toolsOptions = ["React", "Node.js", "Docker"];
const methodologiesOptions = ["Agile", "Scrum", "Kanban"];

export default function ShowParseCV({
  visible,
  onClose,
  parseCV,
  uploadedFiles,
  formData,
  token,
  setUpdatedCV,
  setIsLoading,
  onSuccess,
}) {
    console.log("+++",token)
  const [cvForm, setCVForm] = useState(parseCV || {
    mainRole: "",
    degreeInfo: { degree: "" },
    skills: {
      languages: [],
      tools: [],
      methodologies: [],
    },
  });

  const handleChange = (key, value) => {
    if (key === "degree") {
      setCVForm((prev) => ({
        ...prev,
        degreeInfo: { ...prev.degreeInfo, degree: value },
      }));
    } else {
      setCVForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  const toggleSelection = (type, item) => {
    const updated = cvForm.skills[type].includes(item)
      ? cvForm.skills[type].filter((i) => i !== item)
      : [...cvForm.skills[type], item];

    setCVForm((prev) => ({
      ...prev,
      skills: { ...prev.skills, [type]: updated },
    }));
  };

  const renderMultiSelectGroup = (label, options, type) => (
    <View style={styles.multiGroup}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => toggleSelection(type, option)}
          style={styles.checkboxContainer}
        >
          <View style={styles.checkbox}>
            {cvForm.skills[type].includes(option) && <View style={styles.checked} />}
          </View>
          <Text>{option}</Text>
        </Pressable>
      ))}
    </View>
  );

  const handleSubmit = async () => {
    if (setIsLoading) setIsLoading(true);

    try {
      const updatedcvForm = { ...cvForm };
      const data = new FormData();
      data.append("file", {
        uri: uploadedFiles?.uri,
        name: uploadedFiles?.name || "resume.docx",
        type:
          uploadedFiles?.mimeType ||
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const cvInfo = {
        ...formData,
        ...updatedcvForm,
        fileType: "RESUME",
      };

      data.append("cvInfo", JSON.stringify(cvInfo));

      const response = await fetch("https://your-api-url.com/api/contractor-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.status === 201) {
        setUpdatedCV && setUpdatedCV(updatedcvForm);
        onSuccess && onSuccess();
        Alert.alert("Success", "Resume saved!");
        onClose();
      } else {
        Alert.alert("Error", "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Parsed Resume Details</Text>

        <Text style={styles.label}>Main Role</Text>
        <TextInput
          style={styles.input}
          value={cvForm.mainRole}
          onChangeText={(val) => handleChange("mainRole", val)}
        />

        <Text style={styles.label}>Degree</Text>
        <TextInput
          style={styles.input}
          value={cvForm.degreeInfo.degree}
          onChangeText={(val) => handleChange("degree", val)}
        />

        {renderMultiSelectGroup("Languages", programmingLanguages, "languages")}
        {renderMultiSelectGroup("Tools", toolsOptions, "tools")}
        {renderMultiSelectGroup("Methodologies", methodologiesOptions, "methodologies")}

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={[styles.buttonText, { color: "#000" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
  },
  multiGroup: {
    marginTop: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "#f47920",
    borderRadius: 2,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f47920",
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
