Recursion plans

===================================
ToOne
===================================
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

generalGet()
    Start the root sql.
    Pass the params into toOneRecurse()
        toOneRecurse() adds all the regular selects
        When we get to program do the join.
        Pump program's innerFields into toOneRecurse()
            toOneRecurse does the regular selects
            check for toOnes, find none
            check for toManys, find none
            Does toOneRecurse do the await? I don't think so.
            second toOneRecurse() returns
        keep adding oneMoreThing? Nah, we did that right up top.
        first toOneRecurse() returns.
    Back in main function.
    await sql
    unflatten
    no toManys to worry about.
    return


So that's not tooooo bad. Doesn't look like it will play nice with toMany though.
toMany needs the selects done first. for the leftJoins if nothing else.

===================================
ToMany
===================================
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

generalGet()
    Start the root sql.
    Pass the params into toOneRecurse()
        toOneRecurse() adds all the regular selects
        Finds no toOnes, returns.
    await sql
    unflatten
    finds programs (a toMany)
        partialResult[programs] = generalGet(blahblahblah)
    returns


===================================
ToOne with a ToMany inside
===================================
clientProgram(id:3) {
    cp_program_id,
    cp_program,
    cp_referral_date
    program {
        p_program_name
        whatever[Whatever] {
            some_damn_thing
        }
    },
    oneMoreThing
  }

generalGet()
    Start the root sql.
    Pass the params into toOneRecurse()
        toOneRecurse() adds all the regular selects
        check for toOnes, find program. do the join.
        Pump program's innerFields into second toOneRecurse()
            toOneRecurse() does the regular selects
            check for toOnes, find none
            check for toManys, find whatever
                We can't fetch it yet though, because we don't have the left join. put its parameters in a list for later.
                    key is going to be... current path. I guess path: [] is passed into toOneRecurse(), with the current field pushed on at each point
            second toOneRecurse() returns
        check for toManys, find none
        first toOneRecurse() returns.
    Back in main function.
    await sql
    unflatten

    we have accumulated a list of toManys we need to fetch, along with keys we intend to set them on. do that now.
    attach them to partialResult
    do my regular toManys now? Or just fold them into the above step?
            
Let's first do:
FieldRecurse(fields)
    A foreach on all fields
        If it's normal, add to select
        If it's toOne
            Join
            FieldRecurse innerFields
        If it's toMany
            Add leftCol to select
            Add subquery to [Subqueries]
    Done. You return:
        select (kept in higher closure?)
        [Subqueries] (kept in higher closure?)
run the sql
unflatten
foreach Subqueries
    GeneralGet(Subquery)


