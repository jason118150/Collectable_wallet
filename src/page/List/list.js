import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { ListCard } from './listCard';
import { ADDRESS, LIMIT } from '../../utils/const';
import { Loading } from '../../component/loading';

const ListWrapper = styled.div`
    header {
        font-size: 64px;
        text-align: center;
        margin: 32px 0;
    }
    .columns-container {
        display: flex;
        flex-wrap: wrap
    }
`

export const WalletList = () => {
    const [listData, setListData] = useState([]);
    const [isNoMoreData, setIsNoMoreData] = useState();
    const [isLoaging, setIsLoading] = useState(false);
    const [observer, setObserver] = useState(null);
    const bottomRef = useRef(null);
    const pageRef = useRef(0);

    const fetchData = () => {
        fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=${ADDRESS}&offset=${pageRef.current}&limt=${LIMIT}`)
        .then(response => response.json())
        .then(data => {
            if(data.assets.length) { 
                const tmpListData = data.assets.map(el => ({
                    id: el.token_id,
                    address: el.asset_contract.address,
                    imageUrl: el.image_url,
                    name: el.name,
                }))
                pageRef.current++;
                setListData([...listData, ...tmpListData]);
                setIsLoading(pre => !pre);
            } else {
                observer && observer.disconnect();
                setIsNoMoreData(true);
            }
        }).catch(error => {
            console.log(`Fail to fetch Github API, error message: ${error}`)
        });
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const intiateScrollObserver = () => {
            observer && observer.disconnect();
            const callback = ([entry]) => {
                if (entry.isIntersecting && !isNoMoreData) {
                    fetchData();
                }
            }
            const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
            };
            const newObserver = new IntersectionObserver(callback, options)
            if (bottomRef.current) {
            newObserver.observe(bottomRef.current);
            }
            setObserver(newObserver)   
        }
        if(!isNoMoreData) intiateScrollObserver();
        return () => {
            observer && observer.disconnect();
        }
    }, [listData])

    return (
        <ListWrapper>
            <header>List</header>
            <div className="columns-container">
                {
                    listData.map((data, index) => {
                        let ref = index === listData.length-1 ? bottomRef : null;
                        return (
                            <ListCard
                                key={index}
                                ref={ref}
                                index={index}
                                data={data}
                            />
                        )
                    })
                }
            </div>
            {
                isLoaging ? <Loading /> : null
            }
        </ListWrapper>
    )
}