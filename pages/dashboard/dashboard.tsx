import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Modal from 'react-native-modal';
import { Card } from 'react-native-paper';

import styles from './styles';

interface PixCharge {
  qrCode?: string;
  copiedCode?: string;
  txid?: string;
  cliente?: string;
}

const Dashboard: React.FC = () => {
  const apiUrl = "https://www.s24hrs.com.br/api/pix/create-charge-bets";

  const [goal, setGoal] = React.useState<boolean>(false);
  const [apostar, setApostar] = React.useState<boolean>(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nomeCompleto, setNomeCompleto] = React.useState("");
  const [valor, setValor] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedNomeCompleto = await AsyncStorage.getItem("nomeCompleto");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedCpf = await AsyncStorage.getItem("cpf");
      const storedValor = await AsyncStorage.getItem("valor");

      if (storedNomeCompleto && storedEmail && storedCpf && storedValor) {
        setNomeCompleto(storedNomeCompleto);
        setEmail(storedEmail);
        setCpf(storedCpf);
        setValor(storedValor);
      }
    } catch (error) {
      console.log("Erro ao recuperar dados do armazenamento local:", error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("nomeCompleto", nomeCompleto);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("cpf", cpf);
      await AsyncStorage.setItem("valor", valor);
    } catch (error) {
      console.log("Erro ao salvar dados no armazenamento local:", error);
    }
  };

  const players = [
    { id: "1", name: "Rogério Ceni", number: 1 },
    { id: "2", name: "Leonardo", number: 2 },
    { id: "3", name: "Danillo", number: 3 },
    { id: "4", name: "Aldair", number: 4 },
    { id: "5", name: "Cafu", number: 5 },
    { id: "6", name: "Dunga", number: 6 },
    { id: "7", name: "Bebeto", number: 7 },
    { id: "8", name: "Rivaldo", number: 8 },
    { id: "9", name: "Ronaldo", number: 9 },
    { id: "10", name: "Rivaldo", number: 10 },
    { id: "11", name: "Ronaldinho", number: 11 },
    { id: "12", name: "Dida", number: 12 },
    { id: "13", name: "Belletti", number: 13 },
    { id: "14", name: "Anderson Polga", number: 14 },
    { id: "15", name: "Kaká", number: 15 },
    { id: "16", name: "Gilberto Silva", number: 16 },
    { id: "17", name: "Denílson", number: 17 },
    { id: "18", name: "Vampeta", number: 18 },
  ];

  const renderPlayerItem = ({
    item,
  }: {
    item: { id: string; name: string; number: number };
  }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerName}>{item.number}</Text>
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  );

  const playGoalSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/bbc_crowds--ex_07055010.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Erro ao reproduzir o som:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePayment = async () => {
    try {
      setLoading(true); // Ativar o indicador de carregamento

      const numericValue = valor.replace(/[^0-9.,]/g, "").replace(",", ".");
      const numericValueFloat = parseFloat(numericValue);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nomeCompleto,
          cpf,
          valor: numericValueFloat,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Resposta da API:", responseData);

        if (location) {
          Linking.openURL('https://' + responseData.loc.location);
        }

        storeData();
      } else {
        console.log("Falha na requisição à API");
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
    } finally {
      setLoading(false); // Desativar o indicador de carregamento
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/background-top.png")}
        style={styles.container}
      >
        <Text style={styles.liveText}>Partida ao vivo</Text>
        <Card style={styles.cardContainer}>
          <View style={styles.teamContainer}>
            <Image
              source={require("../../assets/image 2.png")}
              style={styles.teamImage}
            />
            <Text style={styles.scoreText}>0 : 2</Text>
            <Image
              source={require("../../assets/image 5.png")}
              style={styles.teamImage}
            />
          </View>
        </Card>
      </ImageBackground>
      <View style={styles.historyContainer}>
        <Image
          source={require("../../assets/history.png")}
          style={styles.history}
        />
        <View style={styles.shadow} />
      </View>
      <View style={styles.menuContainer}>
        <Text style={styles.menuText}>Jogadores</Text>
        <View style={styles.teamIconsContainer}>
          <Image
            source={require("../../assets/image 2.png")}
            style={styles.teamIcon}
          />
          <Image
            source={require("../../assets/image 5.png")}
            style={styles.teamIcon}
          />
        </View>
      </View>
      <FlatList
        style={styles.playerList}
        data={players}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id}
      />
      {goal && (
        <Image source={require("../../assets/goal.gif")} style={styles.goal} />
      )}
      {apostar && (
        <TouchableOpacity style={styles.betButton} onPress={toggleModal}>
          <Text style={styles.betButtonText}>Apostar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.betButton} onPress={toggleModal}>
        <Text style={styles.betButtonText}>Realizar Pagamento</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitleSave}>
            Os dados serão salvos após o primeiro depósito
          </Text>
          <Text style={styles.modalTitle}>Realizar Pagamento por Pix</Text>
          <Text style={styles.modalText}>Digite o valor:</Text>
          <TextInputMask
            type="money"
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$ ",
              suffixUnit: "",
            }}
            style={styles.input}
            placeholder="Digite o valor"
            placeholderTextColor="#9E9E9E"
            value={valor}
            onChangeText={setValor}
          />

          <Text style={styles.modalText}>Digite seu Nome Completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu Nome Completo"
            placeholderTextColor="#9E9E9E"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <Text style={styles.modalText}>Digite seu E-mail abaixo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail abaixo"
            placeholderTextColor="#9E9E9E"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.modalText}>Digite seu CPF abaixo:</Text>
          <TextInputMask
            type={"cpf"}
            style={styles.input}
            placeholder="Digite seu CPF abaixo"
            placeholderTextColor="#9E9E9E"
            value={cpf}
            onChangeText={setCpf}
          />
          <TouchableOpacity
            style={styles.apostarButton}
            onPress={handlePayment}
            disabled={isLoading} // Desabilitar o botão quando isLoading for true
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.apostarButtonText}>Pagar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default Dashboard;
