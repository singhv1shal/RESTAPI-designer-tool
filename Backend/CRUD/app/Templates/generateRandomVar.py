import random 

def genRandomstring(length):
    R = "_"
    for i in range(0,length):
        r = chr( random.randrange(97,97+26) )
        R += r
    return R