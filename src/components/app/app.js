import React, {Component} from "react";
//import ReactDOM from "react-dom";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";

import "./app.scss";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id:1,
                    label: "label1",
                    important: false,
                    like: false
                },
                {
                    id:2,
                    label: "label2",
                    important: true,
                    like: false
                },
                {
                    id:3,
                    label: "label3",
                    important: false,
                    like: false
                }
            ],

            term: "",
            filter: "all"
        }

        this.maxId = 4;
    }


    deleteItem = (id) => {
        this.setState(({data}) => {
             const index = data.findIndex(elem => elem.id === id)

             const before = data.slice(0, index);
             const after = data.slice(index + 1);

             const newArray = [...before, ...after];

             return {
                 data: newArray
             }
        }) 
    }

    onToggleImportant = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex(elem => elem.id === id)
            const before = data.slice(0, index);
            const old = data[index];
            const newItem = {...old, important : !old.important}
            const after = data.slice(index + 1);
            const newArray = [...before, newItem, ...after];
             return {
                 data: newArray
             }
        })
    }

    onToggleLiked = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex(elem => elem.id === id)
            const before = data.slice(0, index);
            const old = data[index];
            const newItem = {...old, like : !old.like}
            const after = data.slice(index + 1);
            const newArray = [...before, newItem, ...after];
             return {
                 data: newArray
             }
        })
    }

    addItem = (body) => {
        const newItem = {
            id: this.maxId++,
            label: body,
            important: false
        }
        
        this.setState(({data}) => {
            const newArray = [...data, newItem];

            return {
                data: newArray
            }
        })
    }

    searchPost = (items, term) => {
        if(term.length === 0) {
            return items
        }

        return items.filter( item=> {
            return item.label.indexOf(term) > -1
        })
    }

    filterPost = (items, filter) => {
        if(filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter((item) => item.like).length;
        const allPostsLength = data.length; 
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader 
                liked={liked}
                allPostsLength={allPostsLength}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div> 
                <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm 
                    onAdd={this.addItem}/>
            </div>
        )
    }
}