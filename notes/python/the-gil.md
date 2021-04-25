
# The Global Interpreter Lock (GIL) in Python

  

**CPython uses reference counting for memory management**

- it keeps track a counter--that counts how many references to an object exists

- it increments the counter if we add a code that references the object

- it decrements the counter if the code is done using or has finished referencing the object

- when the reference counter is zero (this means no more processes reference the object), then we cleanup/release the memory of the object

- :white_check_mark: works perfectly with single-thread

- :white_check_mark: works well with with multi-threads IO-bound


**But**

- DOESN'T work well with multi-thread CPU bound

- DOESN't take advantage of multi-cores

- because of the **GIL** (when an object are shared within multiple threads, how does CPython locks the reference count?)



## The GIL

- ensures that only one thread runs in the interpreter at a time

    - when a thread is running it locks the GIL

    - when the thread has finished running, it releases the GIL so another thread can acquire it and start running

-  **this prevents deadlocks**
-  **this prevents race conditions complications** 

- :white_check_mark: this works OK with multi-threads IO-bound as the GIL is being shared when a thread is waiting for IO

**But**

- for multi-threaded CPU-bound/ multi-processors, they become single-threaded, even slower because of the overhead of the acquiring/releasing of the GIL

Resources:

-  [Why is Python so slow?](https://hackernoon.com/why-is-python-so-slow-e5074b6fe55b)
-  [What Is the Python Global Interpreter Lock (GIL)?](https://realpython.com/python-gil/)
-  [Understanding the Python GIL](https://www.youtube.com/watch?v=Obt-vMVdM8s)
-  [Python's Infamous GIL by Larry Hastings](https://www.youtube.com/watch?v=KVKufdTphKs)
-  [Removing Python's GIL: The Gilectomy](https://www.youtube.com/watch?v=P3AyI_u66Bw)