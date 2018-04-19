/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

const REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class App extends Component {
  constructor() {
    super();

    // 在状态中保存电影数据和是否加载完成
    this.state = {
      movies: [],
      loaded: false
    };

    // 为fetchData方法绑定this
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // 当组件被渲染的时候执行fetchData方法
    this.fetchData();
  }

  /**
   * 获取电影数据
   */
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 这里需要将数据格式改为key:value的形式，否则会报VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.的警告
        const moviesData = responseData.movies.map(data => {
          return {
            key: data.id,
            value: data
          };
        });

        this.setState({
          movies: moviesData,
          loaded: true
        });
      })
      .catch(err => console.error(err));
  }

  /**
   * 渲染电影列表的被一条信息
   * @param {Object} item FlatList的每一个item
   */
  renderMovieCard(item) {
    // 这里需要item.item是因为FlatList提供的数据结构就是如此
    const movie = item.item.value;
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{ uri: movie.posters.thumbnail }}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loaded) {
      return (
        <FlatList
          data={this.state.movies}
          renderItem={this.renderMovieCard}
          style={styles.list}
        />
      );
    } else {
      // 显示加载页
      return (
        <View style={styles.container}>
          <Text style={styles.title}>正在加载电影数据...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});
