
import {
  Navbar,
  NavbarBrand,
  NavLink,
  Nav,
  NavItem
} from 'reactstrap';

function NavigationBar(args) {

  return (
    <div>
      <Navbar {...args}>
        <Nav className="mr-auto">
          <NavbarBrand href="/">Services4YouNow</NavbarBrand>
          <NavItem>
            <NavLink href="/tasks">Cadastrar Tarefas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/agents">Cadastrar Agentes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/categories">Cadastrar Categorias</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
