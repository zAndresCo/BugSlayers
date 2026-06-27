import sqlite3
import sys
print('Using DB: bugslayers.db')
con = sqlite3.connect('bugslayers.db')
cur = con.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cur.fetchall()
print('Tables:', tables)
for t in ['usuarios','empresas','diagnosticos','respuestas']:
    try:
        cur.execute(f"SELECT count(*) FROM {t}")
        print(t, cur.fetchone()[0])
    except Exception as e:
        print(t, '->', e)
con.close()
