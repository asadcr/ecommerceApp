import React , { Component } from "react";

import { StyleSheet, View, Text ,SafeAreaView ,Image, TextInput, TouchableOpacity, Picker} from "react-native";

import COLORS from "../../Styles/color";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProductUser } from "../../models/Product";
import { ScrollView } from "react-native-gesture-handler";


interface CheckoutProps {
    navigation : any
}

interface CheckoutState {
    checkoutInfo : ProductUser | null
}

export default class Checkout extends Component<CheckoutProps, CheckoutState> {

    constructor(props: {}) {
        super(props as any);

        this.state = {
            checkoutInfo : null
        }
    }
    async componentDidMount() {
       var obj  ={
            name : '',
            address : '',
            cardNumber : 123,
            holderName : '',
            expDate : '04/10/2022',
            year : '2022',
            cvv : 1234,

        } as ProductUser

        this.setState({checkoutInfo : obj })
    }

    onFieldUpdate = (fieldName: string, value: any) => {
        var userData = this.state.checkoutInfo  as any;
        userData[fieldName] = value;
        this.setState({ checkoutInfo: userData });
    };
   
    render() {
        return (
            <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
            }}
          >
              <ScrollView>
            <View style={style.header}>
              <Icon name="arrow-back" size={28} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={style.imageContainer}>
              <Image
                source={require('../../assets/credit_card.png')}
                style={{ resizeMode: "contain", flex: 1 , display : 'contents'}}
              />
            </View>
            <View style={style.detailsContainer}>
                <TextInput 
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[style.textInput, {
                            color: COLORS.dark,
                            backgroundColor: COLORS.light,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => this.onFieldUpdate('name',value)}
                    />
                    <TextInput 
                        placeholder="Your Address"
                        placeholderTextColor="#666666"
                        style={[style.textInput, {
                            color: COLORS.dark,
                            backgroundColor: COLORS.light,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => this.onFieldUpdate('address',value)}
                    />
                    <TextInput 
                        placeholder="Card Number"
                        placeholderTextColor="#666666"
                        style={[style.textInput, {
                            color: COLORS.dark,
                            backgroundColor: COLORS.light,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => this.onFieldUpdate('cardNumber',value)}
                    />
                    <TextInput 
                                placeholder="Card Holder Name"
                                placeholderTextColor="#666666"
                                style={[style.textInput, {
                                    color: COLORS.dark,
                                    backgroundColor: COLORS.light,
                                }]}
                                autoCapitalize="none"
                                onChangeText={(value) => this.onFieldUpdate('holderName',value)}
                            />
                    <Picker
                        selectedValue={this.state.checkoutInfo?.expDate}
                        style={ style.textInput}
                        onValueChange={(itemValue) => this.onFieldUpdate('expDate',itemValue)}
                    >
                        <Picker.Item label="Month" value="Month" />
                        <Picker.Item label="January" value="January" />
                        <Picker.Item label="February" value="February" />
                        <Picker.Item label="March" value="March" />
                        <Picker.Item label="April" value="April" />
                        <Picker.Item label="May" value="May" />
                        <Picker.Item label="June" value="June" />
                        <Picker.Item label="July" value="July" />
                        <Picker.Item label="August" value="August" />
                        <Picker.Item label="September" value="September" />
                        <Picker.Item label="October" value="October" />
                        <Picker.Item label="November" value="November" />
                        <Picker.Item label="December" value="December" />
                    </Picker>
                    
                    <Picker
                        selectedValue={this.state.checkoutInfo?.year}
                        style={ style.textInput}
                        onValueChange={(itemValue) => this.onFieldUpdate('year',itemValue)}
                    >
                        <Picker.Item label="Year" value="Year" />
                        <Picker.Item label="2022" value="2022" />
                        <Picker.Item label="2023" value="2022" />
                        <Picker.Item label="2024" value="2022" />
                        <Picker.Item label="2025" value="2022" />
                        <Picker.Item label="2026" value="2022" />
                        <Picker.Item label="2027" value="2022" />
                        <Picker.Item label="2028" value="2022" />
                        <Picker.Item label="2029" value="2022" />
                        <Picker.Item label="2030" value="2022" />
                        <Picker.Item label="2031" value="2022" />
                        <Picker.Item label="2032" value="2022" />

                    </Picker>

                    <TextInput 
                        placeholder="CVV"
                        placeholderTextColor="#666666"
                        style={[style.textInput, {
                            color: COLORS.dark,
                            backgroundColor: COLORS.light,
                        }]}
                        autoCapitalize="none"
                        onChangeText={(value) => this.onFieldUpdate('cvv',value)}
                    />


                        <View style={style.button}>
                            <TouchableOpacity
                                style={style.submit}
                                onPress={() => { alert('order success') }}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={style.submit}
                                >
                                    <Text style={[style.textSubmit, {
                                        color: '#fff'
                                    }]}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
            </View>
           
            </ScrollView>
          </SafeAreaView>
        );
    }


}

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 2,
        paddingTop: 30,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    
    textInput: {
        flex: 1,
        padding : 10,
        marginTop: 20,
        color: '#05375a',
    },

    button: {
        alignItems: 'center',
        marginTop: 50
    },
    submit: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom:10
    },
    textSubmit: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
