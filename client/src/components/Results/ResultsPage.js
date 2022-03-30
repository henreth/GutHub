import './ResultsPage.css';
import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import DrinkCard from '../DrinkCard/DrinkCard';
import { animateScroll as ScrollAction } from 'react-scroll';


function scrollBot() {
    // ScrollAction.scrollToBottom();
    let cards = document.getElementById('cards')
    cards.scroll(0, 100)
}



export default function ResultsPage({searchActive, searchResults,setSearchResults,searchParams,setSearchParams,handleSearchChange,handleSearchSubmit,scrollTop}) {

    function displayDrinks(data){
            if (data.length>=20) {
                return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                    {drinkCardsRow(data.slice(4,8))}
                    {drinkCardsRow(data.slice(8,12))}
                    {drinkCardsRow(data.slice(12,16))}
                    {drinkCardsRow(data.slice(16,20))}
                    {drinkCardsRow(data.slice(20,24))}
                    {drinkCardsRow(data.slice(24,28))}
                    {drinkCardsRow(data.slice(28,32))}
                </React.Fragment>}
            else if (data.length>=16)
                {return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                    {drinkCardsRow(data.slice(4,8))}
                    {drinkCardsRow(data.slice(8,12))}
                    {drinkCardsRow(data.slice(12,16))}
                    {drinkCardsRow(data.slice(16,))}
                </React.Fragment>}
            else if (data.length>=12 ){
                return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                    {drinkCardsRow(data.slice(4,8))}
                    {drinkCardsRow(data.slice(8,12))}
                    {drinkCardsRow(data.slice(12,))}
                </React.Fragment>}
            else if (data.length>=8)
                {return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                    {drinkCardsRow(data.slice(4,8))}
                    {drinkCardsRow(data.slice(8,))}
                </React.Fragment>}
            else if (data.length>=4)
                {return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                    {drinkCardsRow(data.slice(4,))}
                </React.Fragment>}
            else
                {return <React.Fragment>
                    {drinkCardsRow(data.slice(0,4))}
                </React.Fragment>}
            }
        
    function drinkCardsRow(data) {
        return <div className='drinks-page-cards-container'>
            {data.map(drink => {
                return (<DrinkCard
                    drink={drink}
                    key={drink.id}
                />)
            })}
        </div>
    }


    function handleSearchUpdate(e){
        e.preventDefault();
        setSearchParams(e.target.value)
        let query ={"query":e.target.value}
        axios.post('/search',query)
        .then(r=>{
          setSearchResults(r.data)      
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.errors);
            alert(error.response.data.errors)
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
      }
    

    let searchResultsCardClass = searchResults.length<=8?'search-results-card frozen':'search-results-card'
    let titleClass= searchResults.length==0?'search-results-title-off':'search-results-title'

    return (
        <React.Fragment>
            <div className={titleClass}>Search Results</div>
            <div className='search-title-wrapper'>
            <form onSubmit={handleSearchSubmit}><input 
                    type='text'
                    placeholder='Search For A Drink'
                    autoComplete='off'
                    cursor='pointer'
                    className='results-search'
                    value={searchParams}
                    onChange={handleSearchUpdate}
                    id='search-input'
                    >
                </input></form>
                <div className='go-home-button' onClick={scrollTop}>↑</div>
            </div>
            {/* <button onClick={scrollTop}>test</button> */}
            {/* <button onClick={scrollBot}>Test</button> */}

            <div className='search-results-container'>
                <div className={searchResultsCardClass} id='cards'>
                    {displayDrinks(searchResults)}
                    {searchResults.length==0 && searchActive==true?
                        <div className='no-results-container'> 
                            <div className='no-results-found'>No Results Found</div>
                            <div className='no-results-query'>Please Enter a Different Search Query</div>
                        </div>
                        
                        :null}
                </div>
            </div>
        </React.Fragment>
    )
}