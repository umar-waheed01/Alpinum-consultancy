// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";

// const programmingLanguages = [
//     { value: "ABAP", label: "ABAP" },
//     { value: "ActionScript", label: "ActionScript" },
//     { value: "Ada", label: "Ada" },
//     { value: "Apex", label: "Apex" },
//     { value: "APL", label: "APL" },
//     { value: "Assembly", label: "Assembly" },
//     { value: "Ballerina", label: "Ballerina" },
//     { value: "Bash", label: "Bash" },
//     { value: "BASIC", label: "BASIC" },
//     { value: "C", label: "C" },
//     { value: "C#", label: "C#" },
//     { value: "C++", label: "C++" },
//     { value: "Clojure", label: "Clojure" },
//     { value: "COBOL", label: "COBOL" },
//     { value: "CoffeeScript", label: "CoffeeScript" },
//     { value: "Common Lisp", label: "Common Lisp" },
//     { value: "Crystal", label: "Crystal" },
//     { value: "D", label: "D" },
//     { value: "Dart", label: "Dart" },
//     { value: "Delphi", label: "Delphi" },
//     { value: "Elixir", label: "Elixir" },
//     { value: "Elm", label: "Elm" },
//     { value: "Erlang", label: "Erlang" },
//     { value: "F#", label: "F#" },
//     { value: "Fortran", label: "Fortran" },
//     { value: "Go", label: "Go" },
//     { value: "Groovy", label: "Groovy" },
//     { value: "Haskell", label: "Haskell" },
//     { value: "HTML/CSS", label: "HTML/CSS" },
//     { value: "Java", label: "Java" },
//     { value: "JavaScript", label: "JavaScript" },
//     { value: "Julia", label: "Julia" },
//     { value: "Kotlin", label: "Kotlin" },
//     { value: "LabVIEW", label: "LabVIEW" },
//     { value: "Ladder Logic", label: "Ladder Logic" },
//     { value: "Lisp", label: "Lisp" },
//     { value: "Logo", label: "Logo" },
//     { value: "Lua", label: "Lua" },
//     { value: "MATLAB", label: "MATLAB" },
//     { value: "Nim", label: "Nim" },
//     { value: "Objective-C", label: "Objective-C" },
//     { value: "OCaml", label: "OCaml" },
//     { value: "Pascal", label: "Pascal" },
//     { value: "Perl", label: "Perl" },
//     { value: "PHP", label: "PHP" },
//     { value: "PL/SQL", label: "PL/SQL" },
//     { value: "PowerShell", label: "PowerShell" },
//     { value: "Prolog", label: "Prolog" },
//     { value: "Python", label: "Python" },
//     { value: "R", label: "R" },
//     { value: "Racket", label: "Racket" },
//     { value: "Raku", label: "Raku" },
//     { value: "REXX", label: "REXX" },
//     { value: "Ruby", label: "Ruby" },
//     { value: "Rust", label: "Rust" },
//     { value: "SAS", label: "SAS" },
//     { value: "Scala", label: "Scala" },
//     { value: "Scheme", label: "Scheme" },
//     { value: "Scratch", label: "Scratch" },
//     { value: "Shell", label: "Shell" },
//     { value: "Smalltalk", label: "Smalltalk" },
//     { value: "Solidity", label: "Solidity" },
//     { value: "SQL", label: "SQL" },
//     { value: "Swift", label: "Swift" },
//     { value: "Tcl", label: "Tcl" },
//     { value: "TypeScript", label: "TypeScript" },
//     { value: "VB.NET", label: "VB.NET" },
//     { value: "Visual Basic", label: "Visual Basic" },
//     { value: "WebAssembly", label: "WebAssembly" },
//     { value: "VHDL", label: "VHDL" },
//     { value: "Verilog", label: "Verilog" },
//     { value: "Zig", label: "Zig" },
//   ];
// const toolsOptions = [
//     { value: "Cadence Simulator", label: "Cadence Simulator" },
//     { value: "ModelSim", label: "ModelSim" },
//     { value: "Vivado", label: "Vivado" },
//     { value: "Quartus", label: "Quartus" },
//     { value: "Synopsys", label: "Synopsys" },
//     { value: "Altium Designer", label: "Altium Designer" },
//     { value: "Xilinx ISE", label: "Xilinx ISE" },
//     { value: "LTspice", label: "LTspice" },
//     { value: "OrCAD", label: "OrCAD" },
//     { value: "Mentor Graphics", label: "Mentor Graphics" },
//     { value: "Verilog", label: "Verilog" },
//     { value: "VHDL", label: "VHDL" },
//     { value: "Proteus", label: "Proteus" },
//     { value: "KiCad", label: "KiCad" },
//     { value: "React", label: "React" },
//     { value: "Angular", label: "Angular" },
//     { value: "Vue.js", label: "Vue.js" },
//     { value: "Node.js", label: "Node.js" },
//     { value: "Laravel", label: "Laravel" },
//     { value: "Django", label: "Django" },
//     { value: "Flask", label: "Flask" },
//     { value: "Spring Boot", label: "Spring Boot" },
//     { value: "Express.js", label: "Express.js" },
//     { value: "Ruby on Rails", label: "Ruby on Rails" },
//     { value: "ASP.NET", label: "ASP.NET" },
//     { value: "WordPress", label: "WordPress" },
//     { value: "Gatsby", label: "Gatsby" },
//     { value: "Next.js", label: "Next.js" },
//     { value: "Svelte", label: "Svelte" },
//     { value: "React Native", label: "React Native" },
//     { value: "Flutter", label: "Flutter" },
//     { value: "Swift/UIKit", label: "Swift/UIKit" },
//     { value: "SwiftUI", label: "SwiftUI" },
//     { value: "Kotlin/Android", label: "Kotlin/Android" },
//     { value: "Xamarin", label: "Xamarin" },
//     { value: "Ionic", label: "Ionic" },
//     { value: "Visual Studio Code", label: "Visual Studio Code" },
//     { value: "Visual Studio", label: "Visual Studio" },
//     { value: "IntelliJ IDEA", label: "IntelliJ IDEA" },
//     { value: "Eclipse", label: "Eclipse" },
//     { value: "PyCharm", label: "PyCharm" },
//     { value: "Android Studio", label: "Android Studio" },
//     { value: "Xcode", label: "Xcode" },
//     { value: "WebStorm", label: "WebStorm" },
//     { value: "Sublime Text", label: "Sublime Text" },
//     { value: "Vim", label: "Vim" },
//     { value: "Emacs", label: "Emacs" },
//     { value: "Atom", label: "Atom" },
//     { value: "Docker", label: "Docker" },
//     { value: "Kubernetes", label: "Kubernetes" },
//     { value: "Jenkins", label: "Jenkins" },
//     { value: "GitHub Actions", label: "GitHub Actions" },
//     { value: "GitLab CI/CD", label: "GitLab CI/CD" },
//     { value: "Travis CI", label: "Travis CI" },
//     { value: "CircleCI", label: "CircleCI" },
//     { value: "Terraform", label: "Terraform" },
//     { value: "Ansible", label: "Ansible" },
//     { value: "Puppet", label: "Puppet" },
//     { value: "Chef", label: "Chef" },
//     { value: "AWS", label: "AWS" },
//     { value: "Azure", label: "Azure" },
//     { value: "GCP", label: "GCP" },
//     { value: "Heroku", label: "Heroku" },
//     { value: "Vercel", label: "Vercel" },
//     { value: "Netlify", label: "Netlify" },
//     { value: "MySQL", label: "MySQL" },
//     { value: "PostgreSQL", label: "PostgreSQL" },
//     { value: "MongoDB", label: "MongoDB" },
//     { value: "Redis", label: "Redis" },
//     { value: "SQL Server", label: "SQL Server" },
//     { value: "Oracle", label: "Oracle" },
//     { value: "SQLite", label: "SQLite" },
//     { value: "Firebase", label: "Firebase" },
//     { value: "DynamoDB", label: "DynamoDB" },
//     { value: "Cassandra", label: "Cassandra" },
//     { value: "Jest", label: "Jest" },
//     { value: "Mocha", label: "Mocha" },
//     { value: "Selenium", label: "Selenium" },
//     { value: "Cypress", label: "Cypress" },
//     { value: "JUnit", label: "JUnit" },
//     { value: "TestNG", label: "TestNG" },
//     { value: "Pytest", label: "Pytest" },
//     { value: "Postman", label: "Postman" },
//     { value: "SoapUI", label: "SoapUI" },
//     { value: "Swagger", label: "Swagger" },
//     { value: "Figma", label: "Figma" },
//     { value: "Sketch", label: "Sketch" },
//     { value: "Adobe XD", label: "Adobe XD" },
//     { value: "Photoshop", label: "Photoshop" },
//     { value: "Illustrator", label: "Illustrator" },
//     { value: "InDesign", label: "InDesign" },
//     { value: "Zeplin", label: "Zeplin" },
//     { value: "InVision", label: "InVision" },
//     { value: "Jira", label: "Jira" },
//     { value: "Trello", label: "Trello" },
//     { value: "Asana", label: "Asana" },
//     { value: "Confluence", label: "Confluence" },
//     { value: "Monday.com", label: "Monday.com" },
//     { value: "ClickUp", label: "ClickUp" },
//     { value: "Microsoft Project", label: "Microsoft Project" },
//     { value: "Basecamp", label: "Basecamp" },
//     { value: "Notion", label: "Notion" },
//   ];

// const methodologiesOptions = [
//     { value: "Agile", label: "Agile" },
//     { value: "Scrum", label: "Scrum" },
//     { value: "Kanban", label: "Kanban" },
//     { value: "Lean", label: "Lean" },
//     { value: "Waterfall", label: "Waterfall" },
//     { value: "TDD", label: "TDD" },
//     { value: "BDD", label: "BDD" },
//     { value: "XP", label: "XP (Extreme Programming)" },
//     { value: "FDD", label: "FDD (Feature-Driven Development)" },
//     { value: "DSDM", label: "DSDM (Dynamic Systems Development Method)" },
//     { value: "Crystal", label: "Crystal" },
//     { value: "UVM", label: "UVM (Universal Verification Methodology)" },
//     { value: "RUP", label: "RUP (Rational Unified Process)" },
//     { value: "SAFe", label: "SAFe (Scaled Agile Framework)" },
//     { value: "DevOps", label: "DevOps" },
//     { value: "RAD", label: "RAD (Rapid Application Development)" },
//     { value: "Spiral", label: "Spiral" },
//     { value: "Prince2", label: "PRINCE2" },
//     { value: "PMI/PMBOK", label: "PMI/PMBOK" },
//     { value: "LeSS", label: "LeSS (Large-Scale Scrum)" },
//     { value: "SixSigma", label: "Six Sigma" },
//     { value: "Nexus", label: "Nexus" },
//     { value: "Scrumban", label: "Scrumban" },
//   ];

// export default function ShowParseCV({
//   visible,
//   onClose,
//   parseCV,
//   uploadedFiles,
//   formData,
//   token,
//   setUpdatedCV,
//   setIsLoading,
//   onSuccess,
// }) {
//   const [cvForm, setCVForm] = useState(
//     parseCV || {
//       mainRole: "",
//       degreeInfo: { degree: "" },
//       skills: {
//         languages: [],
//         tools: [],
//         methodologies: [],
//       },
//     }
//   );

//   const handleChange = (key, value) => {
//     if (key === "degree") {
//       setCVForm((prev) => ({
//         ...prev,
//         degreeInfo: { ...prev.degreeInfo, degree: value },
//       }));
//     } else {
//       setCVForm((prev) => ({ ...prev, [key]: value }));
//     }
//   };

//   const renderDropdown = (label, options, type) => {
//     const [showModal, setShowModal] = useState(false);
//     const selectedItems = cvForm.skills[type];

//     const toggleOption = (value) => {
//       const updated = selectedItems.includes(value)
//         ? selectedItems.filter((v) => v !== value)
//         : [...selectedItems, value];

//       setCVForm((prev) => ({
//         ...prev,
//         skills: { ...prev.skills, [type]: updated },
//       }));
//     };

//     return (
//       <View style={styles.dropdownWrapper}>
//         <Text style={styles.label}>{label}</Text>
//         <TouchableOpacity
//           style={styles.dropdownInput}
//           onPress={() => setShowModal(true)}
//         >
//           <Text>
//             {selectedItems.length > 0
//               ? selectedItems.join(", ")
//               : `Select ${label}`}
//           </Text>
//         </TouchableOpacity>

//         <Modal visible={showModal} transparent animationType="slide">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.label}>Choose {label}</Text>
//               <ScrollView>
//                 {options.map((option) => {
//                   const value = option.value;
//                   const labelText = option.label;
//                   const isSelected = selectedItems.includes(value);

//                   return (
//                     <TouchableOpacity
//                       key={value}
//                       onPress={() => toggleOption(value)}
//                       style={[
//                         styles.optionItem,
//                         isSelected && styles.optionSelected,
//                       ]}
//                     >
//                       <Text
//                         style={{
//                           color: isSelected ? "#fff" : "#000",
//                           fontWeight: isSelected ? "bold" : "normal",
//                         }}
//                       >
//                         {labelText}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </ScrollView>

//               <TouchableOpacity
//                 style={styles.modalCloseButton}
//                 onPress={() => setShowModal(false)}
//               >
//                 <Text style={styles.modalCloseText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   };

//   const handleSubmit = async () => {
//     if (setIsLoading) setIsLoading(true);

//     try {
//       const updatedcvForm = { ...cvForm };
//       const data = new FormData();
//       data.append("file", {
//         uri: uploadedFiles?.uri,
//         name: uploadedFiles?.name || "resume.docx",
//         type:
//           uploadedFiles?.mimeType ||
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       });

//       const cvInfo = {
//         ...formData,
//         ...updatedcvForm,
//         fileType: "RESUME",
//       };

//       data.append("cvInfo", JSON.stringify(cvInfo));

//       const response = await fetch(
//         "https://alpinum-consulting.vercel.app/api/contractor-profile",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: data,
//         }
//       );

//       if (response.status === 201) {
//         setUpdatedCV && setUpdatedCV(updatedcvForm);
//         onSuccess && onSuccess();
//         Alert.alert("Success", "Resume saved!");
//         onClose();
//       } else {
//         Alert.alert("Error", "Upload failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Something went wrong.");
//     } finally {
//       if (setIsLoading) setIsLoading(false);
//     }
//   };

//   return (
//     <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.heading}>Parsed Resume Details</Text>

//         <Text style={styles.label}>Main Role</Text>
//         <TextInput
//           style={styles.input}
//           value={cvForm.mainRole}
//           onChangeText={(val) => handleChange("mainRole", val)}
//         />

//         <Text style={styles.label}>Degree</Text>
//         <TextInput
//           style={styles.input}
//           value={cvForm.degreeInfo.degree}
//           onChangeText={(val) => handleChange("degree", val)}
//         />

//         {renderDropdown("Languages", programmingLanguages, "languages")}
//         {renderDropdown("Tools", toolsOptions, "tools")}
//         {renderDropdown("Methodologies", methodologiesOptions, "methodologies")}

//         <View style={styles.buttonGroup}>
//           <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.cancelButton]}
//             onPress={onClose}
//           >
//             <Text style={[styles.buttonText, { color: "#000" }]}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//     backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   label: {
//     fontWeight: "600",
//     marginTop: 15,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 6,
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 30,
//   },
//   button: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "#f47920",
//     borderRadius: 6,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: "#eee",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   dropdownWrapper: {
//     marginTop: 15,
//   },
//   dropdownInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 6,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 20,
//     maxHeight: "80%",
//   },
//   optionItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   optionSelected: {
//     backgroundColor: "#f47920",
//   },
//   modalCloseButton: {
//     marginTop: 20,
//     backgroundColor: "#f47920",
//     padding: 12,
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   modalCloseText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });


import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function ResumeDetail({ route }) {
  const { parsedResume, parsedData, formData } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Resume Summary</Text>

      <Text style={{ marginTop: 10, fontWeight: '600' }}>Main Role:</Text>
      <Text>{parsedData?.mainRole || "Not found"}</Text>

      <Text style={{ marginTop: 10, fontWeight: '600' }}>Degree:</Text>
      <Text>{parsedData?.degreeInfo?.degree || "Not found"}</Text>

      <Text style={{ marginTop: 10, fontWeight: '600' }}>Skills:</Text>
      <Text>Languages: {parsedData?.skills?.languages.join(', ')}</Text>
      <Text>Tools: {parsedData?.skills?.tools.join(', ')}</Text>
      <Text>Methodologies: {parsedData?.skills?.methodologies.join(', ')}</Text>

      <Text style={{ marginTop: 20, fontWeight: '600' }}>Form Data:</Text>
      <Text>{JSON.stringify(formData, null, 2)}</Text>
    </ScrollView>
  );
}

