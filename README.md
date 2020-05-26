## graphql-stuff

Some experiments with graphql. Naive resolvers, dataloaders, and recursive SQL building root resolvers. Yee.

### Build instructions
Clone the repository then run `npm install` to install all dependencies.

This app is expecting to find a local MySQL/MariaDB called `graph_pcs.` (On Windows, I use XAMPP for this). Connection config is done in `app.js`. There's test data which can be inserted by running (and perhaps modifying) the scripts in the `/sql/` folder. These will insert data into 4 tables, client, client_program, clinician_program, and program.

Once that's done, start the database (via the XAMPP console) then run `node app.js` (or if it's installed, `nodemon app.js`) to start the development server. The graphql sandbox is accessible at [http://localhost:4000]. There's a regular express server listening at [http://localhost:3000] as well, but no endpoints on it at the moment.

app.js can be set up to use a conventional schema and resolvers (`schema.js` and `resolvers.js`) which use conventional nesting and DataLoader to handle batching to solve the N+1 problem. 

app.js can also use a more experimental schema and resolver (`schema_exp.js` and `resolvers_exp.js`) which recursively solves the entire graphql query into SQL. This also solves the N+1 problem and reduces the number of queries by making left joins where appropriate, as well as only selecting values requested by the graphql. This is heavily influenced by the ideas discussed in Nick Redmark's articles on Root Resolvers here: [https://blog.smartive.ch/advanced-graphql-patterns-embrace-the-ast-4929647c5bd3](https://blog.smartive.ch/advanced-graphql-patterns-embrace-the-ast-4929647c5bd3)

Sample query to put in the sandbox to get you started:
```
{
  client(id:2) {
    c_first_name,
    c_last_name,
    programs {
      cp_program_id,
      cp_program,
      cp_referral_date
      program {
        p_program_name,
        p_program_short_name
      },
      clinicians {
        clp_name,
        clp_referral_date,
        clp_start_date
      }
  	}
  }
}
```

