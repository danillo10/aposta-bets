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
  ScrollView
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
  const url = 'https://pix.gerencianet.com.br/cob/pagar/'

  const [goal, setGoal] = React.useState<boolean>(false);
  const [apostar, setApostar] = React.useState<boolean>(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nomeCompleto, setNomeCompleto] = React.useState("");
  const [valor, setValor] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState(false);
  const [activeTeam, setActiveTeam] = React.useState<string>("team1");
  const [selectedTeam, setSelectedTeam] = React.useState<string>("team1");

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
  }

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

  const team1 = [
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
    { id: "11", name: "Ronaldinho", number: 11 }
  ];
  
  // faca o team2 cm 11 jogadores
  const team2 = [
    { id: "1", name: "Marcos", number: 1 },
    { id: "2", name: "Cafu", number: 2 },
    { id: "3", name: "Lúcio", number: 3 },
    { id: "4", name: "Roque Júnior", number: 4 },
    { id: "5", name: "Edmílson", number: 5 },
    { id: "6", name: "Roberto Carlos", number: 6 },
    { id: "7", name: "Rivaldo", number: 7 },
    { id: "8", name: "Gilberto Silva", number: 8 },
    { id: "9", name: "Ronaldo", number: 9 },
    { id: "10", name: "Ronaldinho", number: 10 },
    { id: "11", name: "Kaká", number: 11 }
  ];

  const renderPlayerItem = ({
    item,
  }: {
    item: { id: string; name: string; number: number };
  }) => (
    <View style={styles.centeredContainer}>
    <View
      style={[
        styles.playerItem,
        selectedTeam === activeTeam ? styles.selectedPlayerItem : null,
      ]}
    >
      <Text style={styles.playerName}>{item.number}</Text>
      <Text style={styles.playerName}>{item.name}</Text>
    </View>
  </View>
  );

  const renderPlayerList = () => {
    let playersData: any = [];
    if (activeTeam === "team1") {
      playersData = team1;
    } else if (activeTeam === "team2") {
      playersData = team2;
    }

    return (
      <FlatList
        data={playersData}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

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

        const { location } = responseData
        if (location) {
          Linking.openURL(url + location.substr(location.lastIndexOf('/') + 1));
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
              source={require("../../assets/image2.png")}
              style={styles.teamImage}
            />
            <Text style={styles.scoreText}>0 : 2</Text>
            <Image
              source={require("../../assets/image5.png")}
              style={styles.teamImage}
            />
          </View>
        </Card>
      </ImageBackground>
      {/* <View style={styles.historyContainer}>
        <Image
          source={require("../../assets/history.png")}
          style={styles.history}
        />
      </View> */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuText}>Jogadores</Text>
        <View style={styles.teamIconsContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveTeam("team1");
              setSelectedTeam("team1");
            }}
            style={[
              styles.teamIcon,
              selectedTeam === "team1" ? styles.selectedTeamIcon : null,
            ]}
          >
            <Image
              source={require("../../assets/image2.png")}
              style={styles.teamIconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveTeam("team2");
              setSelectedTeam("team2");
            }}
            style={[
              styles.teamIcon,
              selectedTeam === "team2" ? styles.selectedTeamIcon : null,
            ]}
          >
            <Image
              source={require("../../assets/image5.png")}
              style={styles.teamIconImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.playerListContainer}>
        <ScrollView style={styles.playerListContainer}>
          {renderPlayerList()}
        </ScrollView>
      </ScrollView>
      {goal && (
        <Image source={require("../../assets/goal.gif")} style={styles.goal} />
      )}
      {apostar && (
        <TouchableOpacity style={styles.betButton} onPress={toggleModal}>
          <Text style={styles.betButtonText}>Apostar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.betButton} onPress={toggleModal}>
        <Text style={styles.betButtonText}>Apostar</Text>
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
