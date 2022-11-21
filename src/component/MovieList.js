import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { getMovieList } from "../apis";

let searchArray = ["banana", "apple", "orange", "pineapple", "mango"];

export default function MovieList(props) {
    const [movieData, setMoviesData] = useState(null);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        async function defaultFunction() {
            let res = await getMovieList();
            if (res.status)
                setMoviesData(res?.data?.movies);
        }
        defaultFunction()
    }, [])

    const handleSearchData = (val) => {
        if (val === "") {
            setSearchData([]);
        }
        let foundArray = searchArray.filter((searchKey) => {
            if (searchKey.includes(val)) {
                return searchKey;
            }
        })
        console.log(foundArray, "foundArray");
        setSearchData(foundArray);
    }

    return (
        <Container maxWidth="lg">
            <Grid container flex={1} sx={{ justifyContent: "space-between" }}>
                <h1>List of Movies</h1>
                <input type="text" list="searchlist" onChange={(e) => handleSearchData(e.target.value)} />
                {
                    searchData && searchData.length > 0
                        ?
                        <datalist id="searchlist">
                            {
                                searchData.map(function (sData, sKey) {
                                    return (
                                        <option key={sKey}>{sData}</option>
                                    )
                                })
                            }
                        </datalist>
                        :
                        null
                }

            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    movieData
                        ?
                        movieData.map(function (dd, key) {
                            return (
                                <Grid item md={4}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader
                                            title={dd.name}
                                            subheader={dd.release_date}
                                            action={
                                                <p>🌟{dd.ratings}</p>
                                            }
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={dd.image}
                                            alt={dd.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {dd.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        :
                        "Loading"
                }

            </Grid>
        </Container>
    )
}