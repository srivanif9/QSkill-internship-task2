from flask import Flask, render_template, request, redirect, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = "payflow_secret_key_123"


# ==========================
# DATABASE SETUP
# ==========================

def create_table():

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


create_table()


# ==========================
# HOME PAGE
# ==========================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================
# SIGNUP
# ==========================

@app.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":

        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]

        hashed_password = generate_password_hash(password)

        try:

            conn = sqlite3.connect("database.db")
            cur = conn.cursor()

            cur.execute(
                """
                INSERT INTO users(name,email,password)
                VALUES(?,?,?)
                """,
                (name, email, hashed_password)
            )

            conn.commit()
            conn.close()

            flash("Account created successfully!")

            return redirect("/login")

        except sqlite3.IntegrityError:

            flash("Email already registered.")

            return redirect("/signup")

    return render_template("signup.html")


# ==========================
# LOGIN
# ==========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        conn = sqlite3.connect("database.db")
        cur = conn.cursor()

        cur.execute(
            """
            SELECT * FROM users
            WHERE email=?
            """,
            (email,)
        )

        user = cur.fetchone()

        conn.close()

        if user:

            stored_password = user[3]

            if check_password_hash(
                stored_password,
                password
            ):

                session["user_id"] = user[0]
                session["user_name"] = user[1]
                session["user_email"] = user[2]

                flash("Login successful!")

                return redirect("/dashboard")

        flash("Invalid Email or Password")

    return render_template("login.html")


# ==========================
# DASHBOARD
# ==========================

@app.route("/dashboard")
def dashboard():

    if "user_id" not in session:

        flash("Please login first.")

        return redirect("/login")

    return render_template(
        "dashboard.html",
        name=session["user_name"]
    )


# ==========================
# LOGOUT
# ==========================

@app.route("/logout")
def logout():

    session.clear()

    flash("Logged out successfully.")

    return redirect("/")


# ==========================
# PROFILE (OPTIONAL)
# ==========================

@app.route("/profile")
def profile():

    if "user_id" not in session:
        return redirect("/login")

    return {
        "name": session["user_name"],
        "email": session["user_email"]
    }


# ==========================
# RUN APP
# ==========================

if __name__ == "__main__":
    app.run(
        debug=True
    )