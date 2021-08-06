import asyncio

async def t():
    await asyncio.sleep(3)
    print(1)
    

async def p():
    await asyncio.sleep(2)
    print(2)
    

async def main():
    asyncio.create_task(t())
    asyncio.create_task(p())

asyncio.run(main())