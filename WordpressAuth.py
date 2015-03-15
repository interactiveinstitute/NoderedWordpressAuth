#!/usr/bin/python
'''

'''
import os
import re
import sys
import phpass
import MySQLdb
import argparse

def auth(username,password):

    UserDict = GetWPuser()
    
    try:
        password_hash = UserDict[username][2]
    except KeyError:
        return None
    
    if len(password_hash) <= 32:
        
        return None
        
        total_md5 += 1
    else:
        wp_hasher = phpass.PasswordHash(8, True)
        
        
        
        check = wp_hasher.check_password(password, password_hash)
            
        if check:
                return UserDict[username][1]

def GetWPuser():
    cred = GetWPDBcredentials()
    
    try:
        con = MySQLdb.connect(cred['DB_HOST'], cred['DB_USER'], cred['DB_PASSWORD'], cred['DB_NAME'])
        cur = con.cursor()
        cur.execute("""
            SELECT ID,user_login,user_pass FROM wp_users 
        """)
        
        users = cur.fetchall()
        
        cur.execute("""
            SELECT user_id,meta_value FROM wordpress.wp_usermeta where meta_key="wp_capabilities";
        """)

        cap = cur.fetchall()
        
    except MySQLdb.Error, e:
        print "Error %d: %s" % (e.args[0], e.args[1])
    finally:
        if con:
            con.close()
            
    u_dict = {}

    for  (u_id,u_name,u_hash) in users:
        for (cap_id,u_cap) in cap:
            if cap_id == u_id:
                break;
    
        u_cap = u_cap.split('"')[1]
        u_dict[u_name] = [u_id,u_cap,u_hash]
    
    return u_dict 
    
def GetWPDBcredentials(config_file="/var/www/wp-config.php"):
    cred = {}
    
    h_file = open(config_file,"r")
    
    cred = {}

    for l in h_file:
        
        if l.find("DB_") != -1:
            parts = l.split("'")
            cred[parts[1]] = parts[3]
            

    
    return cred

if __name__ == '__main__':

    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument('-u', dest='user', help='Username')
    parser.add_argument('-p', dest='password', help='Password')
    parser.add_argument('-c', dest='configfile', default="/var/www/wp-config.php", help='Wordpress config file.')

    args = parser.parse_args()

    #Where am I
    path = os.path.abspath(os.path.dirname(sys.argv[0]))

    print auth(args.user,args.password)
