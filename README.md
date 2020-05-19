## graphql-stuff

Some experiments with graphql.

### Build instructions
Clone the repository then run `npm install` to install all dependencies.

This app is expecting to find a local MySQL/MariaDB called `chris-pcs.` (I use XAMPP for this). Connection config is done in `app.js`. There's test data which can be inserted by running (perhaps modifying) the scripts in the `/sql/` folder. These will insert data into 4 tables, client, client_program, clinician_program, program.

Once that's done, `node app.js` (or maybe better `nodemon app.js`) will start the development server. The graphql sandbox is accessible at [http://localhost:4000]. There's a regular express server listening at [http://localhost:3000] as well, but no endpoints on it at the moment.

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

