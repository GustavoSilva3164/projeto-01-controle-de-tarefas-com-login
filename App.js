import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native"
import styles from "./styles"

export default function App() {
  const [screen, setScreen] = useState("login")

  const [tarefas, setTarefas] = useState({
    operacoes: [],
    objetivos: [],
    exploracao: [],
    producao: []
  })

  const telas = {
    operacoes: { title: "Operações", image: require("./assets/operacoes.png") },
    objetivos: { title: "Objetivos Estratégicos", image: require("./assets/objetivos.png") },
    exploracao: { title: "Exploração", image: require("./assets/exploracao.png") },
    producao: { title: "Produção", image: require("./assets/producao.png") }
  }

  if (screen === "login")
    return <Login setScreen={setScreen} />

  if (screen === "menu")
    return <Menu setScreen={setScreen} />

  if (telas[screen])
    return (
      <TaskScreen
        title={telas[screen].title}
        tasks={tarefas[screen]}
        setTasks={(novaLista) =>
          setTarefas({ ...tarefas, [screen]: novaLista })
        }
        setScreen={setScreen}
        image={telas[screen].image}
      />
    )
}

function Login({ setScreen }) {
  const [cpf, setCpf] = useState("")
  const cpfFixo = "12345678900"

  const entrar = () => {
    if (cpf === cpfFixo) setScreen("menu")
    else alert("CPF inválido")
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/login.png")} style={styles.banner} />
      <Text style={styles.title}>Endfield Industries</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <Botao text="Acessar Terminal" onPress={entrar} />
    </View>
  )
}

function Menu({ setScreen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Operações</Text>

      <Botao text="Operações" onPress={() => setScreen("operacoes")} />
      <Botao text="Objetivos Estratégicos" onPress={() => setScreen("objetivos")} />
      <Botao text="Exploração" onPress={() => setScreen("exploracao")} />
      <Botao text="Produção" onPress={() => setScreen("producao")} />
      <Botao text="Sair" onPress={() => setScreen("login")} />
    </View>
  )
}

function Botao({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

function TaskScreen({ title, tasks, setTasks, setScreen, image }) {
  const [text, setText] = useState("")
  const [filter, setFilter] = useState("todas")
  const [priority, setPriority] = useState("media")

  const adicionar = () => {
    if (!text.trim()) return
    if (tasks.find(t => t.title === text)) return alert("Já existe")

    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: text, done: false, priority }
    ])

    setText("")
  }

  const alternar = id => {
    setTasks(
      tasks.map(t =>
        t.id === id
          ? { id: t.id, title: t.title, done: !t.done, priority: t.priority }
          : t
      )
    )
  }

  const remover = id => setTasks(tasks.filter(t => t.id !== id))
  const limpar = () => setTasks(tasks.filter(t => !t.done))

  const lista = tasks.filter(t => {
    if (filter === "pendentes") return !t.done
    if (filter === "concluidas") return t.done
    return true
  })

  const concluidas = tasks.filter(t => t.done).length

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.banner} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.counter}>Finalizadas: {concluidas}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova operação"
        value={text}
        onChangeText={setText}
      />

      <View style={styles.row}>
        <Botao text="Alta" onPress={() => setPriority("alta")} />
        <Botao text="Média" onPress={() => setPriority("media")} />
        <Botao text="Baixa" onPress={() => setPriority("baixa")} />
      </View>

      <Botao text="Adicionar" onPress={adicionar} />

      <View style={styles.row}>
        <Botao text="Todas" onPress={() => setFilter("todas")} />
        <Botao text="Pendentes" onPress={() => setFilter("pendentes")} />
        <Botao text="Concluídas" onPress={() => setFilter("concluidas")} />
      </View>

      {lista.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma operação registrada</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.task,
                item.done && styles.doneTask,
                item.priority === "alta" && styles.highPriority,
                item.priority === "media" && styles.mediumPriority,
                item.priority === "baixa" && styles.lowPriority
              ]}
            >
              <TouchableOpacity onPress={() => alternar(item.id)}>
                <Text style={styles.taskText}>{item.title}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => remover(item.id)}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Botao text="Limpar Finalizadas" onPress={limpar} />
      <Botao text="Voltar" onPress={() => setScreen("menu")} />
    </View>
  )
}