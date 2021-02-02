import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from './../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faKey, faUser, faLanguage, faEllipsisH, faWallet, faCertificate, faSignOut } from '@fortawesome/pro-light-svg-icons'
import LinearGradient from 'react-native-linear-gradient'

class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    // to display the header of the profile
    _renderHeader = () => {
        return (
            <View style={{ borderBottomRightRadius: 35, backgroundColor: '#0C1A32', height: 200, overflow: 'hidden' }}>

                <View style={{ flex: 1, position: 'relative' }}>

                    {/* Back Btn */}
                    <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                        style={{ position: 'absolute', left: 25, width: 35, height: 35, top: 55, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={30} />
                    </TouchableOpacity>

                    {/* Cover Picture */}

                    <LinearGradient
                        colors={['#f12711', '#f5af19']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ height: 200 }} />

                    {/* Profile picture and name */}
                    <View style={{ position: 'absolute', top: 130, width: '100%', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flex: 1, paddingHorizontal: 35, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 28, color: 'white', fontFamily: 'Avenir-Heavy' }}>Setting</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // icons setting
    _renderBody = () => {
        return (
            <View style={{ flex: 1, padding: 15 }}>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faUser} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faKey} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faLanguage} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Language</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faWallet} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Ledger</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faCertificate} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Certification</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faEllipsisH} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Others</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.onCard}>
                            <FontAwesomeIcon icon={faSignOut} color={'#808080a3'} size={30} />
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', fontFamily: 'Avenir-Heavy' }}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1 }} />
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%' }}>
                    {this._renderHeader()}
                    {this._renderBody()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    onCard: {
        backgroundColor: 'white',
        borderRadius: 9,
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    MyProfile: state.MyProfile
});

const ActionCreators = Object.assign(
    {},
    MyUserActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting)