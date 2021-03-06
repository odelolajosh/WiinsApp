import React from 'react'
import { StyleSheet, View, Image, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import * as RoomsListActions from '../../../../redux/RoomList/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import { faPlus, faSearch } from '@fortawesome/pro-light-svg-icons'
import OneRoomMin from './one-room-min'
import OneRoom from './one-room'
import RoomCreation from './room-creation'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import * as RoomActions from '../../../../redux/OneRoom/actions'
import FastImage from 'react-native-fast-image'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

class HomeMessenger extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            newMessageModal: false,
            oneRoomModal: false,
            search: '',
            roomSelected: null
        }
    }

    componentDidMount = () => {
        this.props.actions.getRoom(1)
    }

    // to set the search
    _searching = (val) => {
        this.setState({ search: val })
        if (this.state.search.length >= 4) {
            this.props.actions.friendsearch(val)
        }
    }

    // to display the line separator
    _separtorSuggestion = () => {
        return (<View style={{ height: 1, backgroundColor: '#9b9b9b45', marginLeft: 75, marginRight: 10 }} />)
    }

    // to display one profile suggestion
    _onSuggest = (item) => {
        return (
            <TouchableOpacity
                onPress={() => alert('go')}
                style={{ flexDirection: 'row', paddingVertical: 10 }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 45, height: 45, borderRadius: 45 }}
                        source={{
                            uri: item.pictureprofile,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={{ flex: 4, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 17 }}>{item._meta.pseudo}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // to display the suggestion container
    _suggestionView = () => {
        return (
            <View style={{ flex: 1, padding: 15 }}>
                <FlatList
                    ItemSeparatorComponent={this._separtorSuggestion}
                    data={this.props.SearchList.list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => this._onSuggest(item)}
                />
            </View>
        )
    }

    // to display the header of the room list
    _headerMessenger = () => {
        return (
            <View style={styles.header_container}>

                {/* search bar */}
                <View style={{ flex: 1 }}>
                    <View style={styles.container_search_bar}>
                        <FontAwesomeIcon icon={faSearch} color={'grey'} size={25} />
                        <TextInput
                            placeholder='Search'
                            style={styles.search_bar}
                            placeholderTextColor="#737373"
                            onChangeText={(val) => this._searching(val.replace(/\s/g, ''))}
                        />
                    </View>
                </View>

            </View>
        )
    }

    // to display the search button
    _btnSearch = () => {
        return (
            <TouchableOpacity
                onPress={() => this.setState({ newMessageModal: true })}
                style={{ position: 'absolute', bottom: 105, left: 35, backgroundColor: 'red', width: 55, height: 55, borderRadius: 55, overflow: 'hidden', backgroundColor: 'red' }}
            >
                <LinearGradient
                    colors={['#4524fd', '#4725ff', '#4725ff']}
                    style={{ width: '100%', height: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <FontAwesomeIcon icon={faPlus} color={'white'} size={25} />
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    // to display the room view
    _oneRoomView = () => {
        return (
            <Modal
                animationIn={'bounceInRight'}
                animationOut={'bounceInLeft'}
                onSwipeComplete={() => this.setState({ oneRoomModal: false })}
                onBackdropPress={() => this.setState({ oneRoomModal: false })}
                isVisible={this.state.oneRoomModal}
                transparent={true}
                swipeDirection={'right'}
                propagateSwipe={true}
                style={{ flex: 1, margin: 0, overflow: 'hidden' }}
                backdropOpacity={0.20}
            >
                {!!this.state.roomSelected ? <OneRoom roomSelected={this.state.roomSelected} goBack={() => this.setState({ oneRoomModal: false, roomSelected: null })} /> : null}
            </Modal>
        )
    }

    // to display the creation room
    _createMessageView = () => {

        return (
            <Modal
                onSwipeComplete={() => this.setState({ newMessageModal: false })}
                onBackdropPress={() => this.setState({ newMessageModal: false })}
                isVisible={true}
                transparent={true}
                swipeDirection={'down'}
                propagateSwipe={true}
                style={{ flex: 1, marginHorizontal: 0, marginBottom: 0, marginTop: '30%', overflow: 'hidden', borderRadius: 45 }}
                backdropOpacity={0.20}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <RoomCreation />
                </View>
            </Modal>
        )
    }

    // to go to a room
    _openARoom = (room) => {
        this.setState({ oneRoomModal: true, roomSelected: room })
        this.props.actions.getRoomById(room._id, 1, null)
    }

    // to display the list of the room
    _renderRoomList = () => {
        return (
            <View style={{ height: '100%' }}>
                <FlatList
                    data={this.props.RoomsList.rooms}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (<OneRoomMin room={item} goToRoom={this._openARoom} />)}
                />
            </View>
        )
    }

    // to display the loading animation
    _displayLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the main screen
    _roomListView = () => {
        return (
            <View style={{ flex: 1 }}>
                {(this.props.RoomsList.isLoading) && (this.state.page == 1) ? this._displayLoading() : null}
                {
                    (this.props.RoomsList.rooms.length > 0) &&
                        (!this.props.RoomsList.isLoading) ?
                        this._renderRoomList() : null
                }
                {this._btnSearch()}
                {this.state.newMessageModal ? this._createMessageView() : null}
                {this._oneRoomView()}
            </View>
        )
    }

    // to show the suggestion
    _viewSelected = () => {
        if (this.state.search.length > 3) return this._suggestionView()
        else return this._roomListView()
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._headerMessenger()}
                {this._viewSelected()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#e3e6ef'
    },
    header_container: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    container_search_bar: {
        height: 38,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: '#f2f3f7',
        overflow: 'hidden',
        alignItems: 'center'
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 10
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    RoomsList: state.Rooms,
    SearchList: state.Search
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    RoomsListActions,
    RoomActions,
    SearchActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeMessenger)