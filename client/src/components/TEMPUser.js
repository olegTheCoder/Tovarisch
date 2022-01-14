function TEMPUser({ id, nickname, name, email,index }) {
	return (
		<li>
      <p>INDEX:{index}</p>
      <p>ID:{id}</p>
			<p>ИМЯ:{name}</p>
      <p>НИКНЕЙМ:{nickname}</p>
      <p>EMAIL:{email}</p>
		</li>
	)
}

export default TEMPUser
