import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
    layout: {
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 200,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    image: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow: {
      position: 'absolute',
      left: 20,
      top: 20,
      width: 50,
      height: 50,
    },
    liveText: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 30,
      color: '#fff',
      marginTop: 30,
    },
    teamContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    teamImage: {
      width: 80,
      height: 80,
      marginHorizontal: 10,
    },
    scoreText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginHorizontal: 10,
    },
    cardContainer: {
      borderRadius: 8,
      padding: 0,
      elevation: 0,
      marginTop: 20,
      backgroundColor: 'transparent',
    },
    historyContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    history: {
      width: '90%',
      height: 150,
      borderRadius: 8,
      position: 'relative',
      marginTop: 20,
    },
    menuContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 90,
      paddingLeft: 20,
    },
    menuText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    playerItem: {
      fontSize: 18,
      fontWeight: 'bold',
      padding: 8,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '90%',
      marginTop: 10,
      marginBottom: 10,
      shadowColor: '#9A9A9A',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      borderRadius: 10,
    },  
    playerList: {
      width: '90%',
      padding: 5,
      color: '#767676',
      fontFamily: 'Roboto',
      fontWeight: 500,
      overflow: 'scroll',
      backgroundColor: '#F5F5F5',
    },
    playerIcon: {
      width: 40,
      height: 40,
    },
    playerName: {
      marginLeft: 12,
      fontSize: 18,
    },
    goal: {
      position: 'absolute',
      zIndex: 10,
      width: '100vw',
      height: '35vh',
      top: '70vh',
    },
    betButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#FFC107',
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
      zIndex: 20,
    },
    betButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    modalContainer: {
      borderRadius: 8,
      padding: 20,
      backgroundColor: '#fff'
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalTitleSave: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#5cbc7c',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#EAEAEA',
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    apostarButton: {
      backgroundColor: '#5cbc7c',
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    apostarButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: '#000',
      marginBottom: 16,
    },
    playerListContainer: {
      height: 400, // Defina a altura desejada
    },    
    teamIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      width: 80,
      marginRight: 20,
    },
    teamIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 50,
      width: 40,
      height: 40,
      marginRight: 10,
    },
    selectedTeamIcon: {
      backgroundColor: '#f8f8f8',
    },
    teamIconImage: {
      width: 30,
      height: 30,
    },
    selectedPlayerItem: {
      backgroundColor: '#f8f8f8',
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;
