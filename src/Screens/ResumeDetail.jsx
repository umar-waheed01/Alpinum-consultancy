import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

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

export default function ResumeDetail({ route, navigation }) {
  const { parsedResume, formData, uploadedFiles, token } = route.params;
  console.log("token", token);
  console.log("uploadedFiles", uploadedFiles);
  console.log("formData", formData);
  console.log("parsedResume", parsedResume);

  const safeArray = (val) =>
    Array.isArray(val)
      ? val
      : typeof val === "string"
      ? val.split(",").map((v) => v.trim())
      : [];

  const [cvForm, setCVForm] = useState({
    designation: parsedResume?.designation || "",
    degreeInfo: { degree: parsedResume?.degreeInfo?.degree || "" },
    skills: {
      languages: safeArray(parsedResume?.skills?.languages),
      tools: safeArray(parsedResume?.skills?.tools),
      methodologies: safeArray(parsedResume?.skills?.methodologies),
    },
  });

  const [dropdownVisible, setDropdownVisible] = useState(null);

  const handleSubmitStaticData = () => {
  const staticPayload = {
    designation: "iT",
    degreeInfo: "Bs iT – University of Gujrat – 2020 - 2024",
    experience: "2",
    rate: 40,
    currency: "INR",
    city: "Gujranwala",
    country: "Pakistan",
    maxDays: 5,
    willingToRelocate: "Yes",
    availability: "2025-06-28T00:00:00.000Z",
    languages: ["react native", "react js", "AND SO ON."],
    tools: ["javascript tool", "TOOL 2", "AND SO ON."],
    methodologies: ["METHODOLOGY g7 tec", "METHODOLOGY 2", "AND SO ON."],
  };

  navigation.navigate("ProfileOverview", { profile: staticPayload });
};


  const handleSubmit = async () => {
    try {
      if (!uploadedFiles?.uri) {
      Alert.alert("Error", "Resume file missing.");
      return;
    }
      const payload = {
        yearsExperience: String(formData.experience) || "" ,
        hourlyRate: formData?.rate || "",
        currency: formData?.currency || "",
        country: formData?.country  || "",
        city: formData?.city || "",
        onSiteWorkDays: formData?.maxDays || "",
        isRelocate: formData.willingToRelocate === "Yes" || "",
        availability: new Date(formData.availability) || "",
        designation: cvForm?.designation  || "",
        degreeInfo: cvForm?.degreeInfo?.degree || "",
        languages: cvForm.skills?.languages || "",  
        tools: cvForm.skills?.tools || "",
        methodologies: cvForm.skills?.methodologies || "",
};


      const data = new FormData();
      data.append("file", {
      uri: uploadedFiles.uri,
      name: uploadedFiles.name || "Resume_Format.docx",
      type: uploadedFiles.mimeType || "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    data.append("cvInfo", JSON.stringify(payload));

      const response = await fetch(
        "https://alpinum-consulting.vercel.app/api/contractor-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      console.error("API error response:", response);

      if (response.status === 201) {
        Alert.alert("Success", "Resume saved!");
        // navigation.goBack();
      } else {
        Alert.alert("Error", "Upload failed.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const toggleOption = (type, value) => {
    const selected = cvForm.skills[type] || [];
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setCVForm((prev) => ({
      ...prev,
      skills: { ...prev.skills, [type]: updated },
    }));
  };

  const renderDropdown = (label, options, type) => {
    const selectedItems = cvForm.skills[type];

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Review & Edit Parsed Resume</Text>

      <Text style={styles.label}>Designation</Text>
      <TextInput
        style={styles.input}
        value={cvForm?.designation}
        onChangeText={(val) => setCVForm((prev) => ({ ...prev, designation: val }))}
      />

      <Text style={styles.label}>Degree</Text>
      <TextInput
        style={styles.input}
        value={cvForm.degreeInfo.degree}
        onChangeText={(val) =>
          setCVForm((prev) => ({
            ...prev,
            degreeInfo: { ...prev.degreeInfo, degree: val },
          }))
        }
      />

      {renderDropdown("Languages", programmingLanguages, "languages")}
      {renderDropdown("Tools", toolsOptions, "tools")}
      {renderDropdown("Methodologies", methodologiesOptions, "methodologies")}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitStaticData}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
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
