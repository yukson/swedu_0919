import { SafeAreaView, StyleSheet, Text, View, FlatList, RefreshControl, Modal} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

function Main_List() : JSX.Element {
    console.log("-- Main_List()");

    const [callList, setCallList] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            requestCallList();
        }, []));

    const requestCallList = () => {
        setLoading(true);

        setTimeout(() => {
            let tmp: any = [];

            for (var i = 0; i < 10; i++) {
                let row = { id: i, start_addr: '출발주소', end_addr: '도착주소', call_state: 'REQ' };
                tmp.push(row);
                }
    
            setCallList(tmp)
            setLoading(false);
        }, 200)
        }

    const Header = () => {
        <View style={styles.header}>
          <Text style={[styles.headerText, {width: wp(80)}]}>출발지 / 도착지</Text>
          <Text style={[styles.headerText, {width: wp(20)}]}>상태</Text>
        </View>
    }

    const ListItem = (row: any) => {
        console.log("row = " + JSON.stringify(row))
        return (
            <View style={{flexDirection: 'row', marginBottom: 5, width: wp(100)}}>
                <View style={{width: wp(80)}}>
                    <Text style={styles.textForm}>{row.item.start_addr}</Text>
                    <Text style={[styles.textForm, {borderTopWidth: 0}]}>{row.item.end_addr}</Text>
            </View>
            <View style={{width: wp(20), alignItems: 'center', justifyContent: 'center'}}>
                <Text>{row.item.call_state}</Text>
            </View>
        </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{flex: 1}}
                data={callList}
                ListHeaderComponent={Header}
                renderItem={ListItem}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                <RefreshControl refreshing={loading} onRefresh={requestCallList} />
                }
          />
      
          <Modal transparent={true} visible={loading}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="spinner" size={50} color={'#3498db'} />
              <Text style={{color: 'black'}}>Loading...</Text>
            </View>
          </Modal>
        </SafeAreaView>
      )
      
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        height: 50,
        marginBottom: 5,
        backgroundColor: '#3498db',
        color: 'white',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    textForm: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3498db',
        height: hp(5),
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default Main_List;