//Cost $25 per gumball, accepts only quarters
class GumballMachine1{
	
    public int num_gumballs;
    private int toeject;
    private boolean has_quarter;

    public GumballMachine1( int size ){
        this.num_gumballs = size;
        this.toeject = 0;
        this.has_quarter = false;
    }

    public void insertQuarter(int coin){
        if ( coin == 25 ) {
            this.has_quarter = true ;
            this.toeject = 1;
        }
        else {
            this.has_quarter = false ;
            this.toeject = 0;
        }
    }
    
    public void insertQuarter(int[] allcoins) {
    	this.toeject = 0;
    	for(int i=0; i<allcoins.length; i++) {
    		if(allcoins[i]==25) {
    			this.toeject++;
    		}
    	}
    	if(this.toeject==0) {
    		this.has_quarter = false;
    		this.toeject = 0;
    	}
    	else 
    		this.has_quarter = true;
    }
    
    public void turnCrank(){
    	if ( this.has_quarter ){
    		if(this.num_gumballs == 0) {
    			System.out.println("Sorry no more gumballs. Collect your coins.");
    		}
    		else if(this.toeject <= this.num_gumballs) {
    			if(this.toeject==1)
    				System.out.println("Thank You! Please collect your gumball.");
    			else
    				System.out.println("Thank You! Please collect "+this.toeject+" gumballs.");
    			this.num_gumballs -= this.toeject;
    		}
    		else if(this.toeject > this.num_gumballs) {
    			int temp = this.num_gumballs;
    			if(temp==1)
    				System.out.println("Sorry, only one gumball available.");
    			else
    				System.out.println("Sorry, only "+temp+" gumballs available.");
    			this.num_gumballs = 0;
    		}
    	}
    	else 
    		System.out.println( "Collect your coins. Please insert at least one quarter." ) ;    
    }
}

//Cost $50 per gumball, accepts two quarters
class GumballMachine2{

    public int num_gumballs;
    private int toeject; 
    private boolean has_quarters;

    public GumballMachine2( int size ){
        this.num_gumballs = size;
        this.toeject = 0;
        this.has_quarters = false;
    }

    public void insertQuarter(int[] allcoins){
    	this.toeject = 0;
    	int quarters = 0;
    	for(int i=0; i<allcoins.length; i++) {
    		if(allcoins[i]==25) {
    			quarters++;
    		}
    	}
    	if(quarters>=2){
    		this.has_quarters = true;
    		this.toeject = quarters/2;
    	}
    	else {
    		this.has_quarters = false;
    		this.toeject = 0;
    	}
    }
    
    public void turnCrank(){
    	if(this.has_quarters) {
    		if(this.num_gumballs == 0) {
    			System.out.println("Sorry no more gumballs. Collect your coins.");
    		}
    		else if(this.toeject <= this.num_gumballs) {
    			if(this.toeject==1)
    				System.out.println("Thank You! Please collect your gumball.");
    			else
    				System.out.println("Thank You! Please collect "+this.toeject+" gumballs.");
    			this.num_gumballs -= this.toeject;
    		}
    		else if(this.toeject > this.num_gumballs) {
    			int temp = this.num_gumballs;
    			if(temp==1)
    				System.out.println("Sorry, only one gumball available.");
    			else
    				System.out.println("Sorry, only "+temp+" gumballs available.");
    			this.num_gumballs = 0;
    		}
    	}
    	else
    		System.out.println( "Collect your coins. Please insert at least two quarters." ) ;
    	
    }
    	
}

//Cost $50 per gumball, accepts all coins
class GumballMachine3{
	
	private int num_gumballs;
	private int toeject;
	private boolean can_eject;
	
	GumballMachine3(int num_gumballs){
		this.num_gumballs = num_gumballs;
		this.can_eject = false;
		this.toeject = 0;
	}
	
	public void insertCoins(int[] allcoins) {
		this.toeject = 0;
		int coins = 0, sum = 0;
		for(int i=0; i<allcoins.length; i++) {
			int t = allcoins[i];
			if(t==1||t==5||t==10||t==25) {
				coins++;
				sum += t;
			}
		}
		if(sum>=50) {
			this.can_eject = true;
			this.toeject = sum/50;
		}
		else if(coins==0){
			this.can_eject = false;
			this.toeject = 0;
		}
	}
	
	public void turnCrank() {
		if(this.can_eject) {
			if(this.num_gumballs == 0) {
    			System.out.println("Sorry no more gumballs. Collect your coins.");
    		}
    		else if(this.toeject <= this.num_gumballs) {
    			if(this.toeject==1)
    				System.out.println("Thank You! Please collect your gumball.");
    			else
    				System.out.println("Thank You! Please collect "+this.toeject+" gumballs.");
    			this.num_gumballs -= this.toeject;
    		}
    		else if(this.toeject > this.num_gumballs) {
    			int temp = this.num_gumballs;
    			if(temp==1)
    				System.out.println("Sorry, only one gumball available.");
    			else
    				System.out.println("Sorry, only "+temp+" gumballs available.");
    			this.num_gumballs = 0;
    		}
		}
		else
			System.out.println("Collect your coins. Please insert sufficient amount.");
	}
}

public class MyGumballMachine{
	public static void main(String[] args) {
		System.out.println("***** Gumball Machine - 1 *****");
		GumballMachine1 gm1 = new GumballMachine1(5);
		gm1.insertQuarter(new int[] {25,25,25});
		gm1.turnCrank();
		gm1.insertQuarter(new int[] {25,25});
		gm1.turnCrank();
		gm1.insertQuarter(25);
		gm1.turnCrank();
		
		System.out.println("***** Gumball Machine - 2 *****");
		GumballMachine2 gm2 = new GumballMachine2(3);
		gm2.insertQuarter(new int[] {10,10,25});
		gm2.turnCrank();
		gm2.insertQuarter(new int[] {25,25,20,25,25,25});
		gm2.turnCrank();
		gm2.insertQuarter(new int[] {25,25,25,25,25});
		gm2.turnCrank();
		
		System.out.println("***** Gumball Machine - 3 *****");
		GumballMachine3 gm3 = new GumballMachine3(4);
		gm3.insertCoins(new int[] {25,10,10});
		gm3.turnCrank();
		gm3.insertCoins(new int[] {25,25,25,25,20});
		gm3.turnCrank();
		gm3.insertCoins(new int[] {25,25,10,10,10,10,10});
		gm3.turnCrank();
	}
}