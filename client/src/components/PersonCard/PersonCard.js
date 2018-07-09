import React from 'react'
import "./PersonCard.css"
import {Image, Icon, Card, Popup} from 'semantic-ui-react'


var PersonCard = props => 
<Popup trigger={
  <Card centered className="personCard" onClick={props.showModalBio}>
    <Image src={props.imageLink} />

    <Card.Content>
      <Card.Header>{props.personName}</Card.Header>
      <Card.Meta>{props.personTitle}</Card.Meta>
      <Card.Description>{props.personDescription}</Card.Description>
    </Card.Content>

    <Card.Content extra>
        <Icon name={props.iconTypeName} />
        {props.funFact}
    </Card.Content>

  </Card>
}>
<Popup.Content> Click For Bio</Popup.Content>
</Popup>

export default PersonCard;