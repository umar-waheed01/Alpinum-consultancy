import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [company, setCompany] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    description: "",
    address: "",
    website: "",
    foundedYear: "",
  });

  const [socialLink, setSocialLink] = useState({
    github: "",
    linkedIn: "",
  });

  useEffect(() => {
    if (token) getUserDetails();
  }, [token]);

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(
        "https://alpinum-consulting.vercel.app/api/company/company-profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await resp.json();
      if (!resp.ok)
        return Alert.alert("Error", result.message || "Failed to load profile");

      setLogoUrl(result?.companyProfile?.logoUrl);
      setCompany({
        companyName: result?.companyProfile?.companyName || "",
        companySize: result?.companyProfile?.companySize?.toString() || "",
        industry: result?.companyProfile?.industry || "",
        description: result?.companyProfile?.description || "",
        address: result?.companyProfile?.location || "",
        website: result?.companyProfile?.website || "",
        foundedYear: result?.companyProfile?.foundedYear?.toString() || "",
      });

      setSocialLink({
        github:
          result?.companyProfile?.socialLinks?.find(
            (el) => el.platform === "github"
          )?.url || "",
        linkedIn:
          result?.companyProfile?.socialLinks?.find(
            (el) => el.platform === "linkedIn"
          )?.url || "",
      });
    } catch (error) {
      Alert.alert("Error", "Unable to fetch profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
      setPreviewUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (profileImage) {
        const file = {
          uri: profileImage.uri,
          name: "logo.jpg",
          type: "image/jpeg",
        };
        formData.append("profileImage", file);
      }

      const data = { ...socialLink, ...company };
      formData.append("data", JSON.stringify(data));

      const resp = await fetch(
        "https://alpinum-consulting.vercel.app/api/company/company-profile",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await resp.json();
      if (!resp.ok)
        return Alert.alert("Error", result.error || "Update failed");
      Alert.alert("Success", "Profile Updated Successfully!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Text style={styles.title}>Edit Profile</Text>

        <View style={styles.imageSection}>
          <Image
            source={{
              uri: previewUrl || logoUrl || "https://via.placeholder.com/100",
            }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Choose Image</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>General Information</Text>

        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={company.companyName}
          onChangeText={(text) => setCompany({ ...company, companyName: text })}
        />

        <Text style={styles.label}>Industry</Text>
        <TextInput
          style={styles.input}
          value={company.industry}
          onChangeText={(text) => setCompany({ ...company, industry: text })}
        />

        <Text style={styles.label}>Company Size</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={company.companySize}
          onChangeText={(text) => setCompany({ ...company, companySize: text })}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={company.description}
          onChangeText={(text) => setCompany({ ...company, description: text })}
        />

        <Text style={styles.label}>Founded Year</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2010"
          keyboardType="numeric"
          value={company.foundedYear}
          onChangeText={(text) => setCompany({ ...company, foundedYear: text })}
        />

        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.input}
          value={company.website}
          onChangeText={(text) => setCompany({ ...company, website: text })}
        />

        <Text style={styles.sectionTitle}>Social Links</Text>

        <Text style={styles.label}>GitHub</Text>
        <TextInput
          style={styles.input}
          value={socialLink.github}
          onChangeText={(text) =>
            setSocialLink({ ...socialLink, github: text })
          }
        />

        <Text style={styles.label}>LinkedIn</Text>
        <TextInput
          style={styles.input}
          value={socialLink.linkedIn}
          onChangeText={(text) =>
            setSocialLink({ ...socialLink, linkedIn: text })
          }
        />

        <Text style={styles.sectionTitle}>Location</Text>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={company.address}
          onChangeText={(text) => setCompany({ ...company, address: text })}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  imageSection: { alignItems: "center", marginBottom: 20 },
  logo: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  imageButton: { backgroundColor: "#f47920", padding: 10, borderRadius: 5 },
  imageButtonText: { color: "#fff", fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#f47920",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default EditProfile;
