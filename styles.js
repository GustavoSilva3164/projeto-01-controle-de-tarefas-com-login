import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20
  },

  banner: {
    width: "100%",
    height: 160,
    marginBottom: 20,
    borderRadius: 8
  },

  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 15
  },

  counter: {
    color: "#94a3b8",
    marginBottom: 10
  },

  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6
  },

  button: {
    backgroundColor: "#334155",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6
  },

  buttonText: {
    color: "white",
    textAlign: "center"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  task: {
    backgroundColor: "#1e293b",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 5
  },

  doneTask: {
    opacity: 0.5
  },

  highPriority: {
    borderLeftColor: "#ef4444"
  },

  mediumPriority: {
    borderLeftColor: "#f59e0b"
  },

  lowPriority: {
    borderLeftColor: "#3b82f6"
  },

  taskText: {
    color: "white"
  },

  removeText: {
    color: "#ef4444",
    fontWeight: "bold"
  },

  emptyText: {
    color: "#94a3b8",
    marginTop: 20,
    textAlign: "center"
  }
});