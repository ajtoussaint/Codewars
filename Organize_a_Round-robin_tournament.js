function buildMatchesTable(n) {
    console.log(`BUILDING TOURNAMENT FOR ${n} TEAMS...`, '\n\n----------------------\n\n');
    //generate all the matches that need to be played
    let matches = [];
    for(let i = 1; i <= n; i++){
      for(let j = i + 1; j <= n; j++){
        if(n%2 === 0){
        }
        matches.push([i,j]);
      }
    }
    //set tournament length to correct size.
    console.log("MATCHES TO SCHEDULE:\n",  matches, "\n_____________________________________________________\n");
    let tournament = [];
    //loop through the matches array n-1 times (gonna be slow)
    let subspaces = {};//hash of used subspace
    for(let rounds=0; rounds < n-1; rounds++){
      let round = []; //fill this up with matches then push to tournament
      //round represents the round of the tournament being drafted.
      let scheduledMatches = [];//used to keep track of which matches are getting removed from the array
      let scheduledTeams = []; //keep track of which teams are already scheduled
      //check each team in matches
      matches.forEach( (match,index) => {
        //if the teams are not already playing 
        if(scheduledTeams.indexOf(match[0])<0 && scheduledTeams.indexOf(match[1])<0){
          //and if the match will not cause a subspace violation
          //subspaces are n-2 length, therefore this check only matters if the 2(round,length + 1) === n - 2
          let subspace = round.reduce( (arr,m) => {
            arr.push(m[0],m[1]);
            return arr;
          }, [])
          subspace.push(match[0],match[1]);
          subspace = subspace.sort( (a,b) => {return a-b}).join("");
          if(!subspaces[subspace]){
            //add the match to this round of the tournament
            round.push(match)
            //add the index to an array of indexes to be removed from matches once the round is decided
            scheduledMatches.push(index);
            scheduledTeams.push(match[0], match[1]);  
          }
        }//end of conditions to add a match
        //for all matches:
        
      })//end of scanning matches
      //for all rounds:
      
      //remove the scheduled matches index from matches
      matches = matches.filter((m,i)=>scheduledMatches.indexOf(i)<0)
      
      //find the subspaces generated by this round
      let newSubspaces = round.map( (m,i) => {
        let r = [...round];
        r.splice(i,1)
        return r.reduce( (arr,tup) => {
         arr.push(tup[0],tup[1]);
         return arr
        },[]).sort( (a,b) => {return a-b}).join("");
      })
      //add subspaces to subspaces
      newSubspaces.forEach(sub => {
        subspaces[sub] = sub;
      })
      //add round to tournament
      tournament.push(round);
      console.log("ADDED ROUND ", rounds+1, " RESULT: ", tournament);
    }
    console.log("UNSCHEDULED: ", matches);
    return tournament;
  }
  
  console.log("TOURNAMENT: ", buildMatchesTable(10));
  //console.log("TOURNAMENT: ", buildMatchesTable(18));
  //console.log("TOURNAMENT: ", buildMatchesTable(20));
  console.log("END MY STUFF")
  console.log("__________________________________")