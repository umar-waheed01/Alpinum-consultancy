// React Native version of your Edit Profile screen (Expo-compatible)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import TopHeader from "../../Components/TopHeader";

const EditProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [cvInfo, setCvInfo] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [socialLink, setSocialLink] = useState({
    github: "",
    twitter: "",
    linkedIn: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [previewUri, setPreviewUri] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const programmingLanguages = [
    { value: "ABAP", label: "ABAP" },
    { value: "ActionScript", label: "ActionScript" },
    { value: "Ada", label: "Ada" },
    { value: "Apex", label: "Apex" },
    { value: "APL", label: "APL" },
    { value: "Assembly", label: "Assembly" },
    { value: "Ballerina", label: "Ballerina" },
    { value: "Bash", label: "Bash" },
    { value: "BASIC", label: "BASIC" },
    { value: "C", label: "C" },
    { value: "C#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "Clojure", label: "Clojure" },
    { value: "COBOL", label: "COBOL" },
    { value: "CoffeeScript", label: "CoffeeScript" },
    { value: "Common Lisp", label: "Common Lisp" },
    { value: "Crystal", label: "Crystal" },
    { value: "D", label: "D" },
    { value: "Dart", label: "Dart" },
    { value: "Delphi", label: "Delphi" },
    { value: "Elixir", label: "Elixir" },
    { value: "Elm", label: "Elm" },
    { value: "Erlang", label: "Erlang" },
    { value: "F#", label: "F#" },
    { value: "Fortran", label: "Fortran" },
    { value: "Go", label: "Go" },
    { value: "Groovy", label: "Groovy" },
    { value: "Haskell", label: "Haskell" },
    { value: "HTML/CSS", label: "HTML/CSS" },
    { value: "Java", label: "Java" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Julia", label: "Julia" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "LabVIEW", label: "LabVIEW" },
    { value: "Ladder Logic", label: "Ladder Logic" },
    { value: "Lisp", label: "Lisp" },
    { value: "Logo", label: "Logo" },
    { value: "Lua", label: "Lua" },
    { value: "MATLAB", label: "MATLAB" },
    { value: "Nim", label: "Nim" },
    { value: "Objective-C", label: "Objective-C" },
    { value: "OCaml", label: "OCaml" },
    { value: "Pascal", label: "Pascal" },
    { value: "Perl", label: "Perl" },
    { value: "PHP", label: "PHP" },
    { value: "PL/SQL", label: "PL/SQL" },
    { value: "PowerShell", label: "PowerShell" },
    { value: "Prolog", label: "Prolog" },
    { value: "Python", label: "Python" },
    { value: "R", label: "R" },
    { value: "Racket", label: "Racket" },
    { value: "Raku", label: "Raku" },
    { value: "REXX", label: "REXX" },
    { value: "Ruby", label: "Ruby" },
    { value: "Rust", label: "Rust" },
    { value: "SAS", label: "SAS" },
    { value: "Scala", label: "Scala" },
    { value: "Scheme", label: "Scheme" },
    { value: "Scratch", label: "Scratch" },
    { value: "Shell", label: "Shell" },
    { value: "Smalltalk", label: "Smalltalk" },
    { value: "Solidity", label: "Solidity" },
    { value: "SQL", label: "SQL" },
    { value: "Swift", label: "Swift" },
    { value: "Tcl", label: "Tcl" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "VB.NET", label: "VB.NET" },
    { value: "Visual Basic", label: "Visual Basic" },
    { value: "WebAssembly", label: "WebAssembly" },
    { value: "VHDL", label: "VHDL" },
    { value: "Verilog", label: "Verilog" },
    { value: "Zig", label: "Zig" },
  ];
  const toolsOptions = [
    { value: "Cadence Simulator", label: "Cadence Simulator" },
    { value: "ModelSim", label: "ModelSim" },
    { value: "Vivado", label: "Vivado" },
    { value: "Quartus", label: "Quartus" },
    { value: "Synopsys", label: "Synopsys" },
    { value: "Altium Designer", label: "Altium Designer" },
    { value: "Xilinx ISE", label: "Xilinx ISE" },
    { value: "LTspice", label: "LTspice" },
    { value: "OrCAD", label: "OrCAD" },
    { value: "Mentor Graphics", label: "Mentor Graphics" },
    { value: "Verilog", label: "Verilog" },
    { value: "VHDL", label: "VHDL" },
    { value: "Proteus", label: "Proteus" },
    { value: "KiCad", label: "KiCad" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Laravel", label: "Laravel" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Express.js", label: "Express.js" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "ASP.NET", label: "ASP.NET" },
    { value: "WordPress", label: "WordPress" },
    { value: "Gatsby", label: "Gatsby" },
    { value: "Next.js", label: "Next.js" },
    { value: "Svelte", label: "Svelte" },
    { value: "React Native", label: "React Native" },
    { value: "Flutter", label: "Flutter" },
    { value: "Swift/UIKit", label: "Swift/UIKit" },
    { value: "SwiftUI", label: "SwiftUI" },
    { value: "Kotlin/Android", label: "Kotlin/Android" },
    { value: "Xamarin", label: "Xamarin" },
    { value: "Ionic", label: "Ionic" },
    { value: "Visual Studio Code", label: "Visual Studio Code" },
    { value: "Visual Studio", label: "Visual Studio" },
    { value: "IntelliJ IDEA", label: "IntelliJ IDEA" },
    { value: "Eclipse", label: "Eclipse" },
    { value: "PyCharm", label: "PyCharm" },
    { value: "Android Studio", label: "Android Studio" },
    { value: "Xcode", label: "Xcode" },
    { value: "WebStorm", label: "WebStorm" },
    { value: "Sublime Text", label: "Sublime Text" },
    { value: "Vim", label: "Vim" },
    { value: "Emacs", label: "Emacs" },
    { value: "Atom", label: "Atom" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "GitHub Actions", label: "GitHub Actions" },
    { value: "GitLab CI/CD", label: "GitLab CI/CD" },
    { value: "Travis CI", label: "Travis CI" },
    { value: "CircleCI", label: "CircleCI" },
    { value: "Terraform", label: "Terraform" },
    { value: "Ansible", label: "Ansible" },
    { value: "Puppet", label: "Puppet" },
    { value: "Chef", label: "Chef" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "GCP", label: "GCP" },
    { value: "Heroku", label: "Heroku" },
    { value: "Vercel", label: "Vercel" },
    { value: "Netlify", label: "Netlify" },
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redis", label: "Redis" },
    { value: "SQL Server", label: "SQL Server" },
    { value: "Oracle", label: "Oracle" },
    { value: "SQLite", label: "SQLite" },
    { value: "Firebase", label: "Firebase" },
    { value: "DynamoDB", label: "DynamoDB" },
    { value: "Cassandra", label: "Cassandra" },
    { value: "Jest", label: "Jest" },
    { value: "Mocha", label: "Mocha" },
    { value: "Selenium", label: "Selenium" },
    { value: "Cypress", label: "Cypress" },
    { value: "JUnit", label: "JUnit" },
    { value: "TestNG", label: "TestNG" },
    { value: "Pytest", label: "Pytest" },
    { value: "Postman", label: "Postman" },
    { value: "SoapUI", label: "SoapUI" },
    { value: "Swagger", label: "Swagger" },
    { value: "Figma", label: "Figma" },
    { value: "Sketch", label: "Sketch" },
    { value: "Adobe XD", label: "Adobe XD" },
    { value: "Photoshop", label: "Photoshop" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "InDesign", label: "InDesign" },
    { value: "Zeplin", label: "Zeplin" },
    { value: "InVision", label: "InVision" },
    { value: "Jira", label: "Jira" },
    { value: "Trello", label: "Trello" },
    { value: "Asana", label: "Asana" },
    { value: "Confluence", label: "Confluence" },
    { value: "Monday.com", label: "Monday.com" },
    { value: "ClickUp", label: "ClickUp" },
    { value: "Microsoft Project", label: "Microsoft Project" },
    { value: "Basecamp", label: "Basecamp" },
    { value: "Notion", label: "Notion" },
  ];

  const methodologiesOptions = [
    { value: "Agile", label: "Agile" },
    { value: "Scrum", label: "Scrum" },
    { value: "Kanban", label: "Kanban" },
    { value: "Lean", label: "Lean" },
    { value: "Waterfall", label: "Waterfall" },
    { value: "TDD", label: "TDD" },
    { value: "BDD", label: "BDD" },
    { value: "XP", label: "XP (Extreme Programming)" },
    { value: "FDD", label: "FDD (Feature-Driven Development)" },
    { value: "DSDM", label: "DSDM (Dynamic Systems Development Method)" },
    { value: "Crystal", label: "Crystal" },
    { value: "UVM", label: "UVM (Universal Verification Methodology)" },
    { value: "RUP", label: "RUP (Rational Unified Process)" },
    { value: "SAFe", label: "SAFe (Scaled Agile Framework)" },
    { value: "DevOps", label: "DevOps" },
    { value: "RAD", label: "RAD (Rapid Application Development)" },
    { value: "Spiral", label: "Spiral" },
    { value: "Prince2", label: "PRINCE2" },
    { value: "PMI/PMBOK", label: "PMI/PMBOK" },
    { value: "LeSS", label: "LeSS (Large-Scale Scrum)" },
    { value: "SixSigma", label: "Six Sigma" },
    { value: "Nexus", label: "Nexus" },
    { value: "Scrumban", label: "Scrumban" },
  ];

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "https://alpinum-consulting.vercel.app/api/contractor-profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.error || "Failed to load profile",
        });
        return;
      }
      setMyInfo(data.user);
      setCvInfo(data.CV);
      const links = data.CV.socialLink || [];
      setSocialLink({
        twitter: links.find((l) => l.platform === "twitter")?.url || "",
        github: links.find((l) => l.platform === "github")?.url || "",
        linkedIn: links.find((l) => l.platform === "linkedIn")?.url || "",
      });
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPreviewUri(result.assets[0].uri);
      setProfileImage(result.assets[0]);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!myInfo || !cvInfo) {
    return (
      <View style={styles.centered}>
        <Text>Failed to load profile</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (profileImage) {
        const fileName = profileImage.uri.split("/").pop();
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profileImage", {
          uri: profileImage.uri,
          name: fileName,
          type,
        });
      }

      formData.append(
        "data",
        JSON.stringify({
          user: myInfo,
          CV: cvInfo,
          socialLinks: socialLink,
        })
      );

      const response = await fetch(
        "https://alpinum-consulting.vercel.app/api/contractor-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: result.error || "Unknown error",
        });
        return;
      }

      Toast.show({ type: "success", text1: "Profile Updated Successfully" });
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOption = (type, value) => {
    const selected = cvInfo[type] || [];
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setCvInfo((prev) => ({
      ...prev,
      [type]: updated,
    }));
  };

  const renderDropdown = (label, options, type) => {
    const selectedItems = cvInfo[type] || [];

    return (
      <View style={styles.dropdownWrapper}>
        <Text style={styles.label}>{label}</Text>

        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => setDropdownVisible(type)}
        >
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {selectedItems.length > 0 ? (
              selectedItems.map((item, idx) => (
                <Text
                  key={idx}
                  style={{
                    backgroundColor: "#f0f0f0",
                    margin: 2,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                  }}
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text>Select {label}</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* MODAL */}
        {dropdownVisible === type && (
          <Modal visible transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalScrollContent}>
                  <Text style={styles.label}>Choose {label}</Text>
                  {options.map((option) => {
                    const value = option.value;
                    const labelText = option.label;
                    const isSelected = selectedItems.includes(value);

                    return (
                      <TouchableOpacity
                        key={value}
                        onPress={() => toggleOption(type, value)}
                        style={[
                          styles.optionItem,
                          isSelected && styles.optionSelected,
                        ]}
                      >
                        <Text
                          style={{
                            color: isSelected ? "#fff" : "#000",
                            fontWeight: isSelected ? "bold" : "normal",
                          }}
                        >
                          {labelText}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setDropdownVisible(null)}
                >
                  <Text style={styles.modalCloseText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  return (
    <>
      <TopHeader />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.heading}>Edit Profile</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                previewUri ||
                cvInfo.imageUrl ||
                "https://via.placeholder.com/120",
            }}
            style={styles.image}
          />
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={myInfo.firstName}
          onChangeText={(val) => setMyInfo({ ...myInfo, firstName: val })}
          style={styles.input}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          value={myInfo.lastName}
          onChangeText={(val) => setMyInfo({ ...myInfo, lastName: val })}
          style={styles.input}
          placeholder="Enter last name"
        />

        <Text style={styles.label}>Designation</Text>
        <TextInput
          value={cvInfo.designation}
          onChangeText={(val) => setCvInfo({ ...cvInfo, designation: val })}
          style={styles.input}
          placeholder="Enter designation"
        />

        <Text style={styles.label}>Expected Rate Per Hour</Text>
        <TextInput
          value={cvInfo?.hourlyRate?.toString() || ""}
          onChangeText={(val) => setCvInfo({ ...cvInfo, hourlyRate: val })}
          style={styles.input}
          placeholder="Enter Expected Rate Per Hour"
        />

        <Text style={styles.label}>Maximum Working Days in Office</Text>
        <TextInput
          value={cvInfo?.onSiteWorkDays?.toString() || ""}
          onChangeText={(val) => setCvInfo({ ...cvInfo, onSiteWorkDays: val })}
          style={styles.input}
          placeholder="Enter Maximum Working Days in Office"
        />

        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          value={cvInfo?.yearsExperience}
          onChangeText={(val) => setCvInfo({ ...cvInfo, yearsExperience: val })}
          style={styles.input}
          placeholder="Enter Years of Experience"
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          value={cvInfo?.city}
          onChangeText={(val) => setCvInfo({ ...cvInfo, city: val })}
          style={styles.input}
          placeholder="Enter city"
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          value={cvInfo?.country}
          onChangeText={(val) => setCvInfo({ ...cvInfo, country: val })}
          style={styles.input}
          placeholder="Enter country"
        />

        <Text style={styles.label}>Calendly URL</Text>
        <TextInput
          value={cvInfo?.calendlyUrl}
          onChangeText={(val) => setCvInfo({ ...cvInfo, calendlyUrl: val })}
          style={styles.input}
          placeholder="Enter Calendly URL"
        />

        <Text style={styles.label}>GitHub</Text>
        <TextInput
          value={socialLink?.github}
          onChangeText={(val) => setSocialLink({ ...socialLink, github: val })}
          style={styles.input}
          placeholder="Enter GitHub URL"
        />

        <Text style={styles.label}>LinkedIn</Text>
        <TextInput
          value={socialLink?.linkedIn}
          onChangeText={(val) =>
            setSocialLink({ ...socialLink, linkedIn: val })
          }
          style={styles.input}
          placeholder="Enter LinkedIn URL"
        />

        <Text style={styles.label}>Twitter</Text>
        <TextInput
          value={socialLink.twitter}
          onChangeText={(val) => setSocialLink({ ...socialLink, twitter: val })}
          style={styles.input}
          placeholder="Enter Twitter URL"
        />

        {renderDropdown("Languages", programmingLanguages, "languages")}
        {renderDropdown("Tools", toolsOptions, "tools")}
        {renderDropdown("Methodologies", methodologiesOptions, "methodologies")}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f5f5" },
  contentContainer: {
    paddingBottom: 60,
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "600", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  image: { width: 120, height: 120, borderRadius: 8 },
  button: {
    backgroundColor: "#504CFE",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  dropdownWrapper: {
    marginBottom: 15,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 50,
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionSelected: {
    backgroundColor: "#2196F3",
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  modalCloseText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#f47920",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditProfile;
