Recursion plans

ToOne
clientProgram(id:3) {
    cp_program_id,
    cp_program,
    cp_referral_date
    program {
        p_program_name
        whatever
    },
    oneMoreThing
  }

MainWrapper()
    Start the root sql.
    Pass the params into MainRecurse()
        MainRecurse() adds all the regular selects
        When we get to program do the join.
        Pump program's innerFields into MainRecurse()
            MainRecurse does the regular selects
            Does MainRecurse do the await? I don't think so.
            second MainRecurse() returns
        keep adding oneMoreThing? Nah, we did that right up top.
        first MainRecurse() returns.
    Back in main function.
    await sql
    unflatten
    no toManys to worry about.
    return


So that's not tooooo bad. Doesn't look like it will play nice with toMany though.
toMany needs the selects done first. for the leftJoins if nothing else.




ToMany
client(id:2) {
    c_first_name,
    c_last_name,
    programs {
      cp_program,
      cp_referral_date,
      cp_start_date,
      cp_discharge_date
    }
  }

MainWrapper()
    Start the root sql.
    Pass the params into MainRecurse()
        MainRecurse() adds all the regular selects
        Finds no toOnes, returns.
    await sql
    unflatten
    finds programs (a toMany)
        partialResult[programs] = MainWrapper(blahblahblah)
    returns



