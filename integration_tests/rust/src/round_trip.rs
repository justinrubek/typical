use {
    crate::types::{Deserialize, Serialize},
    std::{
        fmt::Debug,
        io::{self, Error, ErrorKind},
    },
};

pub fn check_match<T: Debug + Serialize, U: Debug + Deserialize + From<T>>(x: T) -> io::Result<()> {
    println!("Value to be serialized: {:?}", x);

    let size = x.size();
    println!("Expected size of the serialized value: {:?}", size);

    let mut buffer = Vec::<u8>::new();
    x.serialize(&mut buffer)?;
    println!("Bytes from serialization: {:?}", buffer);

    println!("Size of the serialized value: {:?}", buffer.len());
    if buffer.len() != size {
        return Err(Error::new(ErrorKind::Other, "Mismatch!"));
    }

    let y = U::deserialize(&mut buffer.as_slice())?;
    println!("Value deserialized from those bytes: {:?}", y);

    if format!("{:?}", y) == format!("{:?}", U::from(x)) {
        Ok(())
    } else {
        Err(Error::new(ErrorKind::Other, "Mismatch!"))
    }
}

pub fn check_ok<T: Debug + Serialize, U: Debug + Deserialize>(x: &T) -> io::Result<()> {
    println!("Value to be serialized: {:?}", x);

    let size = x.size();
    println!("Expected size of the serialized value: {:?}", size);

    let mut buffer = Vec::<u8>::new();
    x.serialize(&mut buffer)?;
    println!("Bytes from serialization: {:?}", buffer);

    println!("Size of the serialized value: {:?}", buffer.len());
    if buffer.len() != size {
        return Err(Error::new(ErrorKind::Other, "Mismatch!"));
    }

    let y = U::deserialize(&mut buffer.as_slice())?;
    println!("Value deserialized from those bytes: {:?}", y);

    Ok(())
}
